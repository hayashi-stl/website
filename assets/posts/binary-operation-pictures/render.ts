export {}

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

const SIZE = 256;
const CANVAS_SIZE_LIMIT = 4096;
const CANVASES_PER_SIDE = Math.floor(CANVAS_SIZE_LIMIT / SIZE);
const FRAMES_PER_STEP = 4;

const VERTEX_SHADER = `#version 300 es
 
in vec4 a_position;
out vec2 v_position;
 
void main() {
    v_position = a_position.xy;
    gl_Position = vec4(
        a_position.x * 2.0 / float(${SIZE}) - 1.0,
        -(a_position.y * 2.0 / float(${SIZE}) - 1.0),
        0.0, 1.0
    );
}
`;

const FRAGMENT_SHADER = `#version 300 es

precision highp float;

uniform uint u_t;

in vec2 v_position;
out vec4 o_color;

uint f(uint x, uint y, uint t) {
@
}

void main() {
    float result = float(f(uint(v_position.x), uint(v_position.y), u_t)) / 255.0;
    o_color = vec4(result, result, result, 1.0);
}
`

class Picture {
    canvas: Element;
    program: WebGLProgram;
    vao: WebGLVertexArrayObject | null;
    tUniformLoc: WebGLUniformLocation | null;

    public constructor(canvas: Element, gl: WebGL2RenderingContext) {
        this.canvas = canvas;

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER.replace("@", canvas.getAttribute("fn")!));
        this.program = createProgram(gl, vertexShader, fragmentShader);

        const positionAttribLoc = gl.getAttribLocation(this.program, "a_position");
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = [
            0, 0,
            0, SIZE,
            SIZE, SIZE,
            SIZE, SIZE,
            SIZE, 0,
            0, 0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);
        gl.enableVertexAttribArray(positionAttribLoc);
        gl.vertexAttribPointer(positionAttribLoc, 2, gl.FLOAT, false, 0, 0);

        this.tUniformLoc = gl.getUniformLocation(this.program, "u_t");
    }

    public render(gl: WebGL2RenderingContext, glCanvas: HTMLCanvasElement, t: number): void {
        const rect = this.canvas.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top >= glCanvas.clientHeight ||
            rect.right < 0 || rect.left >= glCanvas.clientWidth)
            return;

        const bottom = glCanvas.clientHeight - rect.bottom;            
        gl.viewport(rect.left, bottom, rect.right - rect.left, rect.bottom - rect.top);
        gl.scissor(rect.left, bottom, rect.right - rect.left, rect.bottom - rect.top);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(this.program);
        gl.bindVertexArray(this.vao);
        gl.uniform1ui(this.tUniformLoc, t);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
}

async function main() {
    // Seems like getElementsByTagName is lazy
    const canvases = [...document.getElementsByTagName("fakecanvas")];

    // Offscreen canvas so we have only 1 context
    const glCanvas = document.createElement("canvas");
    glCanvas.setAttribute("class", "omni-canvas");
    document.body.prepend(glCanvas);
    
    const gl = glCanvas.getContext("webgl2");
    if (!gl) {
        console.error(`WebGL2 not supported`);
        return;
    }

    let index = 0;
    const pictures = canvases.map((c) => {
        let p = new Picture(c, gl!);
        index += 1;
        return p;
    });

    gl.enable(gl.SCISSOR_TEST);
    gl.clearColor(0, 0, 0, 1);

    let frame = 0;

    function animate() {
        if (!gl) { return; }

        requestAnimationFrame(animate);

        glCanvas.setAttribute("width", `${glCanvas.clientWidth}`);
        glCanvas.setAttribute("height", `${glCanvas.clientHeight}`);
        glCanvas.setAttribute("style", `transform: translateY(${window.scrollY}px)`);
        for (let picture of pictures)
            picture.render(gl, glCanvas, Math.floor(frame / FRAMES_PER_STEP));

        frame = (frame + 1) % (SIZE * FRAMES_PER_STEP);
    }
    requestAnimationFrame(animate);
}

main();