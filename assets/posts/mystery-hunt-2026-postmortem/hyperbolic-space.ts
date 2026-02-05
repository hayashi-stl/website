export { run }

function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
    let shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success)
        return shader;
    throw Error(gl.getShaderInfoLog(shader)!);
}

function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
    let program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success)
        return program;
    throw Error(gl.getProgramInfoLog(program)!);
}

const VERTEX_SHADER = `#version 300 es
 
in vec2 a_position;
out vec2 v_position;
 
void main() {
    v_position = a_position;
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

import FRAGMENT_SHADER from "./poincare-disk.glsl"
//const FRAGMENT_SHADER = `#version 300 es
//
//precision highp float;
//
//in vec2 v_position;
//out vec4 o_color;
//
//const ivec3 ANGLES = ivec3(2, 3, 7);
//const float L_WIDTH = 0.07;
//
//void main() {
//    o_color = vec4(v_position * 0.5 + 0.5, 0.0, 1.0);
//}
//`

const SHORT_RADIUS: number = Math.acosh(Math.cos(Math.PI / 3) / Math.sin(Math.PI / 7));

const INTERP_SPEED: number = 0.1;

// Matrices here are column-major

function transpose(a: number[]): number[] {
    let result = a.map(_ => 0);
    for (let c = 0; c < 3; ++c)
        for (let r = 0; r < 3; ++r)
            result[c * 3 + r] = a[r * 3 + c];
    return result;
}

function mul(a: number[], b: number[]): number[] {
    let result = a.map(_ => 0);
        for (let c = 0; c < 3; ++c)
            for (let r = 0; r < 3; ++r)
                for (let i = 0; i < 3; ++i)
                    result[c * 3 + r] += a[i * 3 + r] * b[c * 3 + i];
    return result;
}

const IDENTITY: number[] = [1, 0, 0, 0, 1, 0, 0, 0, 1];

function rotZ(angle: number): number[] {
    return [
        Math.cos(angle), Math.sin(angle), 0,
        -Math.sin(angle), Math.cos(angle), 0,
        0, 0, 1
    ]
}

function rotZ14(num: number): number[] {
    return rotZ(Math.PI * 2 * num / 14);
}

function rotX(angle: number): number[] {
    return [
        1, 0, 0,
        0, Math.cosh(angle), Math.sinh(angle),
        0, Math.sinh(angle), Math.cosh(angle)
    ]
}

// a rotation that makes you move backward
const ROT_BACK: number[] = rotX(-2 * SHORT_RADIUS);

const HEPTAGON_ROTATIONS: number[][] = (() => {
    let block0 = IDENTITY;
    let block1 = mul(mul(mul(mul(mul(mul(mul(block0, rotZ14(6)), ROT_BACK), rotZ14(3)), ROT_BACK), rotZ14(-1)), ROT_BACK), rotZ14(7));
    let block2 = Array.from(block1);
    block2[5] *= -1;
    block2[7] *= -1;
    let blocks = [block0, block1, block2];
    //console.log(blocks);
    blocks = blocks.flatMap(block => {
        let hepts = [...new Array(7).keys()].map(i => mul(mul(mul(block, rotZ14(2 * i)), ROT_BACK), rotZ14(7)));
        hepts.push(block);
        return hepts;
    }).map(block => mul(block, rotZ14(-1)));
    return blocks;
})();

// Taken directly from poincare-disk.glsl
function heptagonFlip(fatTriIndex: number): number {
    let block = Math.floor(fatTriIndex / 56);
    let hept = Math.floor(fatTriIndex % 56 / 7);
    let tri = fatTriIndex % 7;
    return hept == 7 ? (block * 8 + hept - 7 + tri) * 7 :
        tri == 0 ? (block * 8 + 7) * 7 + hept :
        tri == 1 ? (block * 8 + (hept + 6) % 7) * 7 + 6 :
        tri == 2 ? ((block + 1) % 3 * 8 + (2 * hept + 6) % 7) * 7 + 3 :
        tri == 3 ? ((block + 2) % 3 * 8 + (4 * hept + 4) % 7) * 7 + 2 :
        tri == 4 ? ((block + 2) % 3 * 8 + (4 * hept + 3) % 7) * 7 + 5 :
        tri == 5 ? ((block + 1) % 3 * 8 + (2 * hept + 1) % 7) * 7 + 4 :
                   (block * 8 + (hept + 1) % 7) * 7 + 1;
}

class HyperbolicSpace {
    div: HTMLDivElement;
    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    vao: WebGLVertexArrayObject | null;
    uniformLocRotation: WebGLUniformLocation | null;
    uniformLocConjugateRotation: WebGLUniformLocation | null;
    uniformLocInterpRotation: WebGLUniformLocation | null;
    uniformLocText: WebGLUniformLocation | null;
    uniformLocTextures: WebGLUniformLocation | null;
    uniformLocNumTextures: WebGLUniformLocation | null;
    puzzleIndexes: number[];
    triIndex: number = 7 * 14 + 1; // index of current bottom-most triangle of center heptagon (rightmost in case of tie)
    movingDirection: number | undefined = undefined;
    interp: number = 0.0;
    buttons: HTMLInputElement[];
    puzzles: HTMLDivElement[];
    nothing: HTMLDivElement;
    isInit: boolean = false;

    static maybeConstructor(text_texture: HTMLImageElement) : HyperbolicSpace | null {
        let canvas = document.getElementById("poincare-disk")! as HTMLCanvasElement;
        let gl = canvas.getContext("webgl2");
        if (!gl) {
            console.error(`WebGL2 not supported`);
            return null;
        }
        return new HyperbolicSpace(canvas, gl, text_texture);
    }

    constructor(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext, text_texture: HTMLImageElement) {
        this.container = document.getElementById("hyperbolic-navigation")! as HTMLDivElement;
        this.buttons = Array.from(this.container.children)
            .filter(b => b instanceof HTMLInputElement)
            .map(b => b as HTMLInputElement);
        let self = this;
        for (let i = 0; i < this.buttons.length; ++i)
            this.buttons[i].addEventListener("click", (ev: MouseEvent) => {
                self.startMove(i);
            })

        this.div = document.getElementById("hyperbolic-space")! as HTMLDivElement;
        this.puzzles = Array.from(this.div.children)
            .filter(p => p.classList.contains("hyperbolic-puzzle"))
            .map(p => p as HTMLDivElement);
        this.nothing = document.getElementById("hyperbolic-nothing")! as HTMLDivElement;

        this.canvas = canvas;
        this.gl = gl;

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
        this.program = createProgram(gl, vertexShader, fragmentShader);

        this.uniformLocRotation = gl.getUniformLocation(this.program, "u_rotation");
        this.uniformLocConjugateRotation = gl.getUniformLocation(this.program, "u_conjugate_rotation");
        this.uniformLocInterpRotation = gl.getUniformLocation(this.program, "u_interp_rotation");
        this.uniformLocText = gl.getUniformLocation(this.program, "u_text");
        this.uniformLocTextures = gl.getUniformLocation(this.program, "u_textures");
        this.uniformLocNumTextures = gl.getUniformLocation(this.program, "u_num_textures");
        this.puzzleIndexes = [-1,  4, -1, -1, -1, -1, -1,  0,
                              -1, -1, -1, -1, -1,  3, -1, -1,
                              -1, -1, -1,  2, -1, -1,  1, -1,]
        const TEX_W = 4;
        const TEX_H = 2;

        let texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, text_texture);
        gl.generateMipmap(gl.TEXTURE_2D);

        this.gl.useProgram(this.program);
        this.gl.uniformMatrix3fv(this.uniformLocRotation, false, new Float32Array(this.rotation()));
        this.gl.uniformMatrix3fv(this.uniformLocConjugateRotation, false, new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]));
        this.gl.uniformMatrix3fv(this.uniformLocInterpRotation, false, new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]));
        this.gl.uniform1i(this.uniformLocText, 0);
        this.gl.uniform2iv(this.uniformLocTextures,
            new Int32Array(this.puzzleIndexes.flatMap(p => [p - Math.floor(p / TEX_W) * TEX_W, Math.floor(p / TEX_W)])));
        this.gl.uniform2i(this.uniformLocNumTextures, TEX_W, TEX_H);

        const positionAttribLoc = gl.getAttribLocation(this.program, "a_position");
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = [
            -1, -1,
            -1, 1,
            1, 1,
            1, 1,
            1, -1,
            -1, -1
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);
        gl.enableVertexAttribArray(positionAttribLoc);
        gl.vertexAttribPointer(positionAttribLoc, 2, gl.FLOAT, false, 0, 0);
    }

    updatePuzzles() {
        let index = this.puzzleIndexes[this.heptagonTriangle()[0]];
        for (let i = 0; i < this.puzzles.length; ++i)
            this.puzzles[i].setAttribute("style", i === index ? "" : "display: none;");
        this.nothing.setAttribute("style", index === -1 ? "" : "display: none;");
    }

    init() {
        this.isInit = true;
        this.div.className = "portal";
        this.container.setAttribute("style", "");
        this.updatePuzzles();
        requestAnimationFrame(this.animate.bind(this));
    }

    uninit() {
        this.isInit = false;
        this.div.className = ""
        this.container.setAttribute("style", "display: none;");
        for (let puzzle of this.puzzles)
            puzzle.setAttribute("style", "");
        this.nothing.setAttribute("style", "display: none;");
    }

    heptagonTriangle(): [number, number] {
        return [Math.floor(this.triIndex / 14), this.triIndex % 14];
    }

    rotation(): number[] {
        let [hept, tri] = this.heptagonTriangle();
        return mul(HEPTAGON_ROTATIONS[hept], rotZ14(tri));
    }

    startMove(direction: number) {
        if (this.movingDirection !== undefined)
            return;
        this.movingDirection = direction;
        this.interp = 0.0;
        this.gl.useProgram(this.program);
        this.gl.uniformMatrix3fv(this.uniformLocConjugateRotation, false, new Float32Array(rotZ14(direction)));
        this.gl.uniformMatrix3fv(this.uniformLocInterpRotation, false, new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]));
    }

    endMove(direction: number) {
        this.movingDirection = undefined;
        let [hept, tri] = this.heptagonTriangle();
        this.triIndex = hept * 14 + (tri + direction) % 14;
        this.triIndex = heptagonFlip(Math.floor(this.triIndex / 2)) * 2 + (this.triIndex & 1);
        this.triIndex = Math.floor(this.triIndex / 14) * 14 + (this.triIndex + (21 - direction)) % 14;
        this.gl.useProgram(this.program);
        this.gl.uniformMatrix3fv(this.uniformLocRotation, false, new Float32Array(this.rotation()));
        this.gl.uniformMatrix3fv(this.uniformLocConjugateRotation, false, new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]));
        this.gl.uniformMatrix3fv(this.uniformLocInterpRotation, false, new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]));
        for (let i = 0; i < this.buttons.length; ++i)
            this.buttons[i].setAttribute("style", (this.triIndex % 2 === 0) === (i % 2 === 0) ? "display: none;" : "");
        this.updatePuzzles();
    }

    trueInterp(): number {
        return Math.sin((this.interp - 0.5) * Math.PI) * 0.5 + 0.5;
    }

    animate() {
        if (!this.isInit)
            return
        requestAnimationFrame(this.animate.bind(this));

        if (this.movingDirection !== undefined) {
            this.interp = Math.min(this.interp + INTERP_SPEED, 1.0);
            if (this.interp == 1.0)
                this.endMove(this.movingDirection);
            else {
                this.gl.useProgram(this.program);
                this.gl.uniformMatrix3fv(this.uniformLocInterpRotation, false, new Float32Array(rotX(this.trueInterp() * -2 * SHORT_RADIUS)));
            }
        }

        this.canvas.setAttribute("width", `${this.canvas.clientWidth * window.devicePixelRatio}`);
        this.canvas.setAttribute("height", `${this.canvas.clientHeight * window.devicePixelRatio}`);
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.render();
    }

    render(): void {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.useProgram(this.program);
        this.gl.bindVertexArray(this.vao);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
}

async function run() {
    let button = document.getElementById("hyperbolic-space-button")! as HTMLInputElement;
    let space: HyperbolicSpace | null | undefined = undefined;
    let loading = false;
    button.addEventListener("click", (ev: MouseEvent) => {
        if (loading)
            return;
        if (space === undefined || space === null || !space.isInit) {
            if (space === undefined) {
                button.value = "Accessibility: OFF (loading)"
                loading = true;
                let image = new Image();
                image.src = "/assets/posts/mystery-hunt-2026-postmortem/hyperbolic-space-puzzles.png";
                image.onload = () => {
                    space = HyperbolicSpace.maybeConstructor(image);
                    button.value = "Accessibility: OFF"
                    loading = false;
                    if (space === null)
                        button.value = "Accessibility: OFF (failed)"
                    else
                        space.init();
                }
                return;
            }
            if (space !== null)
                space.init();
        } else {
            button.value = "Accessibility: ON"
            space.uninit();
        }
    })
}