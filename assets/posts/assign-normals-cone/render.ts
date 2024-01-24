export {}
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
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

    public constructor(filename: string, canvas: HTMLElement) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
        this.camera.position.z = 2;

        this.controls = new OrbitControls(this.camera, canvas);
        
        const geo = new THREE.ConeGeometry(1, 1);
        this.scene.add(new THREE.Mesh(geo));

        const light = new THREE.DirectionalLight(0xffffff);
        this.scene.add(light);
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
    
    const pictures = canvases.map((canvas) => {
        return new Picture(canvas.getAttribute("src")!, canvas as HTMLElement);
    });

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