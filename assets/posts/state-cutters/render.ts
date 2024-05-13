export {}
import * as THREE from 'three'
import { WboitUtils } from '../../three-wboit/src/WboitUtils'
import { WboitPass } from '../../three-wboit/src/WboitPass'
import { MeshWboitMaterial } from '../../three-wboit/src/materials/MeshWboitMaterial'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function updateSize(renderer: THREE.WebGLRenderer, omniCanvas: HTMLCanvasElement, pictures: Picture[]) {
    const width = omniCanvas.clientWidth;
    const height = omniCanvas.clientHeight;
    if (omniCanvas.width !== width || omniCanvas.height !== height) {
        renderer.setSize(width, height, false);
        for (const picture of pictures)
            picture.wboitPass.setSize(width, height);
    }
}

class Picture {
    canvas: HTMLElement;
    camera: THREE.Camera;
    scene: THREE.Scene;
    controls: OrbitControls;
    public wboitPass: WboitPass;

    public constructor(gltf: GLTF, canvas: HTMLElement, renderer: THREE.WebGLRenderer) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.scene.add(gltf.scene);
        this.scene.traverse((object) => {
            if (!(object instanceof THREE.Mesh))
                return;
            let material = object.material as THREE.MeshStandardMaterial;
            let physical = new THREE.MeshPhysicalMaterial({
                metalness: material.metalness,
                roughness: material.roughness,
                clearcoat: 1,
                transparent: material.transparent,
                opacity: material.opacity,
                reflectivity: 0.2,
                ior: 0.9,
                side: material.name == "Engraved Glass" ? THREE.DoubleSide : THREE.DoubleSide
            });
            object.material = physical;
            WboitUtils.patch(physical);
        });
        const ambient = new THREE.AmbientLight(0x808080);
        this.scene.add(ambient);
        this.camera = gltf.cameras[0];
        const directionalLight = new THREE.DirectionalLight(THREE.Color.NAMES.white, 3.0);
        this.camera.add(directionalLight);
        this.wboitPass = new WboitPass(renderer, this.scene, this.camera, new THREE.Color(0.0, 0.0, 0.0), 1.0);

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

        this.wboitPass.render(renderer, null as unknown as THREE.WebGLRenderTarget<THREE.Texture>, null, 0, false);
        //renderer.render(this.scene, this.camera);
    }
}

async function main() {
    // Seems like getElementsByTagName is lazy
    const canvases = [...document.getElementsByTagName("fakecanvas")];

    // Offscreen canvas so we have only 1 context
    const omniCanvas = document.createElement("canvas");
    omniCanvas.setAttribute("class", "omni-canvas");
    document.body.prepend(omniCanvas);
    
    const renderer = new THREE.WebGLRenderer({ canvas: omniCanvas, antialias: true });
    const picture_promises = canvases.map(async (canvas) => {
        const filename = canvas.getAttribute("src")!;
        let gltf = await new GLTFLoader().loadAsync(filename);
        return new Picture(gltf, canvas as HTMLElement, renderer);
    });
    const pictures = await Promise.all(picture_promises);

    renderer.setClearColor(0x000000, 1);
    renderer.setPixelRatio(window.devicePixelRatio);

    function animate() {
        requestAnimationFrame(animate);

        omniCanvas.style.transform = `translateY(${window.scrollY}px)`;
        updateSize(renderer, omniCanvas, pictures);
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