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
  1000
);
camera.position.set(0, 0, 4);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth controls
controls.dampingFactor = 0.05;
controls.zoomSpeed = 0.5;

// loader.load("glow000.gltf", (gltf) => {

//   scene.add(gltf.scene);
//   gltf.scene.position.set(0, 0, 0);

//   gltf.scene.scale.set(20, 20, 20);
// });

const gltfFiles = [
  "glow000.gltf",
  "glow001.gltf",
  "glow002.gltf",
  "glow003.gltf",
  "glow004.gltf",
  "glow005.gltf",
  "glow006.gltf",
  "glow007.gltf",
  "glow008.gltf",
  "glow009.gltf",
  "glow010.gltf",
  "glow011.gltf",
  "glow012.gltf",
  "glow013.gltf",
  "glow014.gltf",
  "glow015.gltf",
  "glow016.gltf",
  "glow017.gltf",
  "glow018.gltf",
  "glow019.gltf",
  "glow020.gltf",
  "glow021gltf",
  "glow022.gltf",
  "glow023.gltf",
  "glow024.gltf",
  "glow025.gltf",
  "glow026.gltf",
  "glow027gltf",
  "glow028.gltf",
  "glow029.gltf",
  "glow030.gltf",
  "glow031.gltf",
  "glow032.gltf",
  "glow033.gltf",
  "glow034.gltf",
  "glow035.gltf",
  "glow036.gltf",
  "glow037.gltf",
  "glow038.gltf",
  "glow039.gltf",
  "glow040.gltf",
  "glow041.gltf",
  "glow042.gltf",
  "glow043.gltf",
  "glow044.gltf",
  "glow045.gltf",
  "glow046.gltf",
  "glow047.gltf",
  "glow048.gltf",
  "glow049.gltf",
  "glow050.gltf",
  "glow051.gltf",
  "glow052.gltf",
  "glow053.gltf",
  "glow054.gltf",
  "glow055.gltf",
  "glow056.gltf",
  "glow057.gltf",
  "glow058.gltf",
  "glow059.gltf",
  "glow060.gltf",
  "glow061.gltf",
  "glow062.gltf",
  "glow063.gltf",
  "glow064.gltf",
  "glow065.gltf",
  "glow066.gltf",
  "glow067.gltf",
  "glow068.gltf",
  "glow069.gltf",
  "glow070.gltf",
  "glow071.gltf",
  "glow072.gltf",
  "glow073.gltf",
  "glow074.gltf",
  "glow075.gltf",
  "glow076.gltf",
  "glow077.gltf",
  "glow078.gltf",
  "glow079.gltf",
  "glow080.gltf",
  "glow081.gltf",
  "glow082.gltf",
  "glow083.gltf",
  "glow084.gltf",
  "glow085.gltf",
  "glow086.gltf",
  "glow087.gltf",
];
let currentIndex = 0;
let currentModel = null;

setInterval(() => {
  loader.load(gltfFiles[currentIndex], (gltf) => {
    if (currentModel) scene.remove(currentModel);
    currentModel = gltf.scene;
    scene.add(currentModel);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.scale.set(20, 20, 20);
  });
  // Move to the next file or loop back to the start
  currentIndex = (currentIndex + 1) % gltfFiles.length;
}, 3000);

// const loadedModels = [];
// gltfFiles.forEach((file, index) => {
//   loader.load(file, (gltf) => {
//     const model = gltf.scene;

//     model.scale.set(20, 20, 20);
//     loadedModels[index] = model;
//   });
// });
// setInterval(() => {
//   if (loadedModels[currentIndex]) {
//     if (currentModel) scene.remove(currentModel);
//     currentModel = loadedModels[currentIndex];
//     scene.add(currentModel);
//   }
//   currentIndex = (currentIndex + 1) % gltfFiles.length;
// }, 1000);

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
