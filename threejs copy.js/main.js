import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
let textureCube;
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x808080);

const loader2 = new THREE.CubeTextureLoader();

textureCube = loader2.load([
  "right5.png",
  "left5.png",
  "top5.png",
  "bottom5.png",
  "front5.png",
  "back5.png",
]);

scene.background = textureCube;

const loader = new GLTFLoader();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  7000
);
camera.position.z = 6000;

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth controls
controls.dampingFactor = 0.05;

loader.load("001.gltf", (gltf) => {
  scene.add(gltf.scene);

  gltf.scene.position.set(0, 0, 0);

  gltf.scene.scale.set(20, 20, 20);
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
