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

class HyperbolicSpace {
    div: HTMLDivElement;
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    vao: WebGLVertexArrayObject | null;
    uniformLocText: WebGLUniformLocation | null;
    uniformLocTextures: WebGLUniformLocation | null;
    uniformLocNumTextures: WebGLUniformLocation | null;
    puzzleIndexes: number[];
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
        this.div = document.getElementById("hyperbolic-space")! as HTMLDivElement;
        this.canvas = canvas;
        this.gl = gl;

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
        this.program = createProgram(gl, vertexShader, fragmentShader);

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
        console.log(this.puzzleIndexes.flatMap(p => [p - Math.floor(p / TEX_W) * TEX_W, Math.floor(p / TEX_W)]));
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

    init() {
        this.isInit = true;
        this.div.className = "portal";
        this.canvas.setAttribute("style", "");
        requestAnimationFrame(this.animate.bind(this));
    }

    uninit() {
        this.isInit = false;
        this.div.className = ""
        this.canvas.setAttribute("style", "display: none;");
    }

    animate() {
        if (!this.isInit)
            return
        requestAnimationFrame(this.animate.bind(this));

        this.canvas.setAttribute("width", `${this.canvas.clientWidth}`);
        this.canvas.setAttribute("height", `${this.canvas.clientHeight}`);
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