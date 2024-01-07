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

async function main() {
    let canvases = document.getElementsByTagName("canvas");
    for (let canvas of canvases) {
        let gl = canvas.getContext("webgl2");
        if (!gl) {
            console.error(`Canvas '${canvas.getAttribute("fn")}' does not have WebGL2 context`);
            continue;
        }

        let vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
        let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER.replace("@", canvas.getAttribute("fn")!));
        let program = createProgram(gl, vertexShader, fragmentShader);

        let positionAttribLoc = gl.getAttribLocation(program, "a_position");
        let positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        let positions = [
            0, 0,
            0, SIZE,
            SIZE, SIZE,
            SIZE, SIZE,
            SIZE, 0,
            0, 0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        let vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        gl.enableVertexAttribArray(positionAttribLoc);
        gl.vertexAttribPointer(positionAttribLoc, 2, gl.FLOAT, false, 0, 0);

        let tUniformLoc = gl.getUniformLocation(program, "u_t");

        gl.viewport(0, 0, SIZE, SIZE);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.bindVertexArray(vao);

        let frame = 0;
        gl.uniform1ui(tUniformLoc, frame);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        function animate() {
            if (!gl) { return; }

            requestAnimationFrame(animate);
            frame = (frame + 1) % (SIZE * FRAMES_PER_STEP);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.uniform1ui(tUniformLoc, Math.floor(frame / FRAMES_PER_STEP));
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
        requestAnimationFrame(animate);
    }
}

main();