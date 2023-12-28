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

    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x80ffff);
    const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(canvas.width, canvas.height);

    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(new URL("../hunts/an-all-american-puzzle-hunt/fortress.glb", import.meta.url).toString());
    scene.add(gltf.scene);

    let numbers = [] as THREE.Object3D<THREE.Object3DEventMap>[];
    for (let child of gltf.scene.children) {
        if (child.userData["Billboard"])
            numbers.push(child);
    }

    console.log(numbers);

    const ambient = new THREE.AmbientLight(0x808080);
    scene.add(ambient);

    camera.position.z = 10;

    const controls = new OrbitControls(camera, renderer.domElement);

    function animate() {
        requestAnimationFrame(animate);

        // Update billboards
        for (let number of numbers) {
            number.setRotationFromQuaternion(camera.quaternion);
        }

        renderer.render(scene, camera);
    }
    animate();
}

main();