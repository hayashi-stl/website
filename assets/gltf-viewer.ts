export {}
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): boolean {
    if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        return true;
    }
    return false;
}

async function main() {
    let canvas = document.getElementsByClassName("gltf-viewer")[0] as HTMLCanvasElement;
    resizeCanvasToDisplaySize(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(canvas.width, canvas.height);

    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(new URL("../hunts/an-all-american-puzzle-hunt/fortress.glb", import.meta.url).toString());
    scene.add(gltf.scene);

    camera.position.z = 10;

    const controls = new OrbitControls(camera, renderer.domElement);

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

main();