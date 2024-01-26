export {}
import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function updateSize(renderer: THREE.WebGLRenderer, omniCanvas: HTMLCanvasElement) {
    const width = omniCanvas.clientWidth;
    const height = omniCanvas.clientHeight;
    if (omniCanvas.width !== width || omniCanvas.height !== height) {
        renderer.setSize(width, height, false);
    }
}

class Picture {
    canvas: HTMLElement;
    camera: THREE.Camera;
    scene: THREE.Scene;
    controls: OrbitControls;

    public constructor(gltf: GLTF, canvas: HTMLElement) {
        if (canvas.hasAttribute("shaderTrick")) {
            // Modify shader to do the cone shader trick
            let mesh = gltf.scene.getObjectByProperty("type", "Mesh") as THREE.Mesh;
            const mat = mesh.material instanceof THREE.Material ? mesh.material : mesh.material[0];
            let newMat = mat.clone();
            newMat.onBeforeCompile = (shader, renderer) => {
                shader.vertexShader = shader.vertexShader
                    .replace(/(?<=void main\(\) \{)/,
                        "bool squeeze = normal.y > 0.999;")
                    .replace(/(?=\}\s*$)/,
                        "vNormal = squeeze ? vec3(0.0, 0.0, 0.0) : vNormal;");
            };
            if (mesh.material instanceof THREE.Material)
                mesh.material = newMat;
            else
                mesh.material[0] = newMat;
        }

        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.scene.add(gltf.scene);
        const ambient = new THREE.AmbientLight(0x808080);
        this.scene.add(ambient);
        this.camera = gltf.cameras[0];

        //this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
        //this.camera.position.z = 2;
        
        //const geo = new THREE.ConeGeometry(1, 1);
        //this.scene.add(new THREE.Mesh(geo));

        //const light = new THREE.DirectionalLight(0xffffff);
        //this.scene.add(light);

        this.controls = new OrbitControls(this.camera, canvas);
    }

    public render(renderer: THREE.WebGLRenderer, omniCanvas: HTMLCanvasElement): void {
        const rect = this.canvas.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top >= omniCanvas.clientHeight ||
            rect.right < 0 || rect.left >= omniCanvas.clientWidth)
            return;

        const left = rect.left;
        const bottom = omniCanvas.clientHeight - rect.bottom;
        const width = rect.right - rect.left;
        const height = rect.bottom - rect.top;
        renderer.setViewport(left, bottom, width, height);
        renderer.setScissor(left, bottom, width, height);

        renderer.render(this.scene, this.camera);
    }
}

async function main() {
    // Seems like getElementsByTagName is lazy
    const canvases = [...document.getElementsByTagName("fakecanvas")];

    // Offscreen canvas so we have only 1 context
    const omniCanvas = document.createElement("canvas");
    omniCanvas.setAttribute("class", "omni-canvas");
    document.body.prepend(omniCanvas);
    
    const picture_promises = canvases.map(async (canvas) => {
        const filename = canvas.getAttribute("src")!;
        let gltf = await new GLTFLoader().loadAsync(filename);
        return new Picture(gltf, canvas as HTMLElement);
    });
    const pictures = await Promise.all(picture_promises);

    const renderer = new THREE.WebGLRenderer({ canvas: omniCanvas, antialias: true });
    renderer.setClearColor(0x000000, 1);
    renderer.setPixelRatio(window.devicePixelRatio);

    function animate() {
        requestAnimationFrame(animate);

        omniCanvas.style.transform = `translateY(${window.scrollY}px)`;
        updateSize(renderer, omniCanvas);
        renderer.setClearColor(0x000000, 0);
        renderer.setScissorTest(false);
        renderer.clear();

        renderer.setClearColor(0x000000, 1);
        renderer.setScissorTest(true);

        pictures.forEach((p) => { p.render(renderer, omniCanvas); });
    }
    requestAnimationFrame(animate);
}

main();