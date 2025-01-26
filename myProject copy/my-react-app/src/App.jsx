import { useState, useEffect, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GoScreenFull, GoArrowLeft } from "react-icons/go";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useParams } from "react-router-dom";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.171.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.171.0/examples/jsm/loaders/GLTFLoader.js";
// import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.171.0/examples/jsm/controls/OrbitControls.js";
import { OrbitControls } from "@react-three/drei";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <header className="bg-black w-full h-20 flex items-center justify-center relative">
      <img
        //src="https://static.vecteezy.com/system/resources/previews/009/634/134/non_2x/url-letter-logo-design-with-polygon-shape-url-polygon-and-cube-shape-logo-design-url-hexagon-logo-template-white-and-black-colors-url-monogram-business-and-real-estate-logo-vector.jpg"
        src="/Logo.png"
        alt="Logo"
        style={{
          height: "100px",
          bottom: "11px",
          position: "relative",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      ></img>

      {location.pathname !== "/" && (
        <GoArrowLeft
          style={{
            color: "white",
            position: "absolute",
            left: "20px",
            cursor: "pointer",
          }}
          size={30}
          onClick={() => navigate(-1)}
        />
      )}
    </header>
  );
};

const Box = ({ title, image, handleClick }) => {
  return (
    <div
      className="bg-gray-100 rounded-lg shadow-md h-56 relative overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={handleClick}
    >
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <h2 className="absolute bottom-4 left-4 font-semibold text-xl ">
        {title}
      </h2>
    </div>
  );
};

const Body = () => {
  const navigate = useNavigate();
  const boxes = [
    {
      id: "HD-110067",
      title: "HD-110067",
      image:
        "https://images.unsplash.com/photo-1464802686167-b939a6910659?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FsYXh5fGVufDB8fDB8fHww",
    },
  ];
  const handleBoxClick = (id, title) => {
    navigate(`/${id}`, { state: { title } });
  };

  return (
    <main className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {boxes.map((box, index) => (
          <Box
            key={index}
            title={box.title}
            image={box.image}
            handleClick={() => handleBoxClick(box.id, box.title)}
          />
        ))}
      </div>
    </main>
  );
};

const CubeBackground = () => {
  const [textureCube, setTextureCube] = useState(null);

  useEffect(() => {
    const loader = new THREE.CubeTextureLoader();
    // loader.setPath("./assets/threejsBoxView/"); // Optional base path
    const cubeTexture = loader.load([
      "/threejsBoxView/right5.png",
      "/threejsBoxView/left5.png",
      "/threejsBoxView/top5.png",
      "/threejsBoxView/bottom5.png",
      "/threejsBoxView/front5.png",
      "/threejsBoxView/back5.png",
    ]);
    setTextureCube(cubeTexture);
  }, []);

  if (!textureCube) return null;

  return <primitive attach="background" object={textureCube} />;
};

const ModelTransition = ({ gltfFiles, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentModel, setCurrentModel] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    const loadModel = () => {
      loader.load(gltfFiles[currentIndex], (gltf) => {
        setCurrentModel(gltf.scene);
      });
    };

    loadModel();
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % gltfFiles.length);
    }, interval);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [currentIndex, gltfFiles, interval]);

  return currentModel ? (
    <primitive object={currentModel} scale={[20, 20, 20]} />
  ) : null;
};

// const ThreeJSSCENEHD110067 = () => {
//   let textureCube;
//   const scene = new THREE.Scene();

//   const loader2 = new THREE.CubeTextureLoader();

//   textureCube = loader2.load([
//     "./assets/threejsBoxView/right5.png",
//     "./assets/threejsBoxView/left5.png",
//     "./assets/threejsBoxView/top5.png",
//     "./assets/threejsBoxView/bottom5.png",
//     "./assets/threejsBoxView/front5.png",
//     "./assets/threejsBoxView/back5.png",
//   ]);

//   scene.background = textureCube;

//   const loader = new GLTFLoader();

//   const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );
//   camera.position.set(0, 0, 4);
//   const renderer = new THREE.WebGLRenderer();

//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);

//   const controls = new OrbitControls(camera, renderer.domElement);
//   controls.enableDamping = true; // Smooth controls
//   controls.dampingFactor = 0.05;
//   controls.zoomSpeed = 0.5;

//   // loader.load("glow000.gltf", (gltf) => {

//   //   scene.add(gltf.scene);
//   //   gltf.scene.position.set(0, 0, 0);

//   //   gltf.scene.scale.set(20, 20, 20);
//   // });

//   const gltfFiles = [
//     "./assets/gtlfFilesForHD1102/glow000.gltf",
//     "./assets/gtlfFilesForHD1102/glow001.gltf",
//     "./assets/gtlfFilesForHD1102/glow002.gltf",
//     "./assets/gtlfFilesForHD1102/glow003.gltf",
//     "./assets/gtlfFilesForHD1102/glow004.gltf",
//     "./assets/gtlfFilesForHD1102/glow005.gltf",
//     "./assets/gtlfFilesForHD1102/glow006.gltf",
//     "./assets/gtlfFilesForHD1102/glow007.gltf",
//     "./assets/gtlfFilesForHD1102/glow008.gltf",
//     "./assets/gtlfFilesForHD1102/glow009.gltf",
//     "./assets/gtlfFilesForHD1102/glow010.gltf",
//     "./assets/gtlfFilesForHD1102/glow011.gltf",
//     "./assets/gtlfFilesForHD1102/glow012.gltf",
//     "./assets/gtlfFilesForHD1102/glow013.gltf",
//     "./assets/gtlfFilesForHD1102/glow014.gltf",
//     "./assets/gtlfFilesForHD1102/glow015.gltf",
//     "./assets/gtlfFilesForHD1102/glow016.gltf",
//     "./assets/gtlfFilesForHD1102/glow017.gltf",
//     "./assets/gtlfFilesForHD1102/glow018.gltf",
//     "./assets/gtlfFilesForHD1102/glow019.gltf",
//     "./assets/gtlfFilesForHD1102/glow020.gltf",
//     "./assets/gtlfFilesForHD1102/glow021gltf",
//     "./assets/gtlfFilesForHD1102/glow022.gltf",
//     "./assets/gtlfFilesForHD1102/glow023.gltf",
//     "./assets/gtlfFilesForHD1102/glow024.gltf",
//     "./assets/gtlfFilesForHD1102/glow025.gltf",
//     "./assets/gtlfFilesForHD1102/glow026.gltf",
//     "./assets/gtlfFilesForHD1102/glow027gltf",
//     "./assets/gtlfFilesForHD1102/glow028.gltf",
//     "./assets/gtlfFilesForHD1102/glow029.gltf",
//     "./assets/gtlfFilesForHD1102/glow030.gltf",
//     "./assets/gtlfFilesForHD1102/glow031.gltf",
//     "./assets/gtlfFilesForHD1102/glow032.gltf",
//     "./assets/gtlfFilesForHD1102/glow033.gltf",
//     "./assets/gtlfFilesForHD1102/glow034.gltf",
//     "./assets/gtlfFilesForHD1102/glow035.gltf",
//     "./assets/gtlfFilesForHD1102/glow036.gltf",
//     "./assets/gtlfFilesForHD1102/glow037.gltf",
//     "./assets/gtlfFilesForHD1102/glow038.gltf",
//     "./assets/gtlfFilesForHD1102/glow039.gltf",
//     "./assets/gtlfFilesForHD1102/glow040.gltf",
//     "./assets/gtlfFilesForHD1102/glow041.gltf",
//     "./assets/gtlfFilesForHD1102/glow042.gltf",
//     "./assets/gtlfFilesForHD1102/glow043.gltf",
//     "./assets/gtlfFilesForHD1102/glow044.gltf",
//     "./assets/gtlfFilesForHD1102/glow045.gltf",
//     "./assets/gtlfFilesForHD1102/glow046.gltf",
//     "./assets/gtlfFilesForHD1102/glow047.gltf",
//     "./assets/gtlfFilesForHD1102/glow048.gltf",
//     "./assets/gtlfFilesForHD1102/glow049.gltf",
//     "./assets/gtlfFilesForHD1102/glow050.gltf",
//     "./assets/gtlfFilesForHD1102/glow051.gltf",
//     "./assets/gtlfFilesForHD1102/glow052.gltf",
//     "./assets/gtlfFilesForHD1102/glow053.gltf",
//     "./assets/gtlfFilesForHD1102/glow054.gltf",
//     "./assets/gtlfFilesForHD1102/glow055.gltf",
//     "./assets/gtlfFilesForHD1102/glow056.gltf",
//     "./assets/gtlfFilesForHD1102/glow057.gltf",
//     "./assets/gtlfFilesForHD1102/glow058.gltf",
//     "./assets/gtlfFilesForHD1102/glow059.gltf",
//     "./assets/gtlfFilesForHD1102/glow060.gltf",
//     "./assets/gtlfFilesForHD1102/glow061.gltf",
//     "./assets/gtlfFilesForHD1102/glow062.gltf",
//     "./assets/gtlfFilesForHD1102/glow063.gltf",
//     "./assets/gtlfFilesForHD1102/glow064.gltf",
//     "./assets/gtlfFilesForHD1102/glow065.gltf",
//     "./assets/gtlfFilesForHD1102/glow066.gltf",
//     "./assets/gtlfFilesForHD1102/glow067.gltf",
//     "./assets/gtlfFilesForHD1102/glow068.gltf",
//     "./assets/gtlfFilesForHD1102/glow069.gltf",
//     "./assets/gtlfFilesForHD1102/glow070.gltf",
//     "./assets/gtlfFilesForHD1102/glow071.gltf",
//     "./assets/gtlfFilesForHD1102/glow072.gltf",
//     "./assets/gtlfFilesForHD1102/glow073.gltf",
//     "./assets/gtlfFilesForHD1102/glow074.gltf",
//     "./assets/gtlfFilesForHD1102/glow075.gltf",
//     "./assets/gtlfFilesForHD1102/glow076.gltf",
//     "./assets/gtlfFilesForHD1102/glow077.gltf",
//     "./assets/gtlfFilesForHD1102/glow078.gltf",
//     "./assets/gtlfFilesForHD1102/glow079.gltf",
//     "./assets/gtlfFilesForHD1102/glow080.gltf",
//     "./assets/gtlfFilesForHD1102/glow081.gltf",
//     "./assets/gtlfFilesForHD1102/glow082.gltf",
//     "./assets/gtlfFilesForHD1102/glow083.gltf",
//     "./assets/gtlfFilesForHD1102/glow084.gltf",
//     "./assets/gtlfFilesForHD1102/glow085.gltf",
//     "./assets/gtlfFilesForHD1102/glow086.gltf",
//     "./assets/gtlfFilesForHD1102/glow087.gltf",
//   ];

//   let currentIndex = 0;
//   let currentModel = null;

//   setInterval(() => {
//     loader.load(gltfFiles[currentIndex], (gltf) => {
//       if (currentModel) scene.remove(currentModel);
//       currentModel = gltf.scene;
//       scene.add(currentModel);
//       gltf.scene.position.set(0, 0, 0);
//       gltf.scene.scale.set(20, 20, 20);
//     });
//     // Move to the next file or loop back to the start
//     currentIndex = (currentIndex + 1) % gltfFiles.length;
//   }, 3000);

//   // const loadedModels = [];
//   // gltfFiles.forEach((file, index) => {
//   //   loader.load(file, (gltf) => {
//   //     const model = gltf.scene;

//   //     model.scale.set(20, 20, 20);
//   //     loadedModels[index] = model;
//   //   });
//   // });
//   // setInterval(() => {
//   //   if (loadedModels[currentIndex]) {
//   //     if (currentModel) scene.remove(currentModel);
//   //     currentModel = loadedModels[currentIndex];
//   //     scene.add(currentModel);
//   //   }
//   //   currentIndex = (currentIndex + 1) % gltfFiles.length;
//   // }, 1000);

//   window.addEventListener("resize", () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//   });

//   function animate() {
//     requestAnimationFrame(animate);
//     controls.update();
//     renderer.render(scene, camera);
//   }

//   animate();
// };

const NewThreeJSSSCENEHD110067 = ({ isWhiteBackground }) => {
  const gltfFiles = [
    "/gtlfFilesForHD1102/glow000.gltf",
    "/gtlfFilesForHD1102/glow001.gltf",
    "/gtlfFilesForHD1102/glow002.gltf",
    "/gtlfFilesForHD1102/glow003.gltf",
    "/gtlfFilesForHD1102/glow004.gltf",
    "/gtlfFilesForHD1102/glow005.gltf",
    "/gtlfFilesForHD1102/glow006.gltf",
    "/gtlfFilesForHD1102/glow007.gltf",
    "/gtlfFilesForHD1102/glow008.gltf",
    "/gtlfFilesForHD1102/glow009.gltf",
    "/gtlfFilesForHD1102/glow010.gltf",
    "/gtlfFilesForHD1102/glow011.gltf",
    "/gtlfFilesForHD1102/glow012.gltf",
    "/gtlfFilesForHD1102/glow013.gltf",
    "/gtlfFilesForHD1102/glow014.gltf",
    "/gtlfFilesForHD1102/glow015.gltf",
    "/gtlfFilesForHD1102/glow016.gltf",
    "/gtlfFilesForHD1102/glow017.gltf",
    "/gtlfFilesForHD1102/glow018.gltf",
    "/gtlfFilesForHD1102/glow019.gltf",
    "/gtlfFilesForHD1102/glow020.gltf",
    "/gtlfFilesForHD1102/glow021gltf",
    "/gtlfFilesForHD1102/glow022.gltf",
    "/gtlfFilesForHD1102/glow023.gltf",
    "/gtlfFilesForHD1102/glow024.gltf",
    "/gtlfFilesForHD1102/glow025.gltf",
    "/gtlfFilesForHD1102/glow026.gltf",
    "/gtlfFilesForHD1102/glow027gltf",
    "/gtlfFilesForHD1102/glow028.gltf",
    "/gtlfFilesForHD1102/glow029.gltf",
    "/gtlfFilesForHD1102/glow030.gltf",
    "/gtlfFilesForHD1102/glow031.gltf",
    "/gtlfFilesForHD1102/glow032.gltf",
    "/gtlfFilesForHD1102/glow033.gltf",
    "/gtlfFilesForHD1102/glow034.gltf",
    "/gtlfFilesForHD1102/glow035.gltf",
    "/gtlfFilesForHD1102/glow036.gltf",
    "/gtlfFilesForHD1102/glow037.gltf",
    "/gtlfFilesForHD1102/glow038.gltf",
    "/gtlfFilesForHD1102/glow039.gltf",
    "/gtlfFilesForHD1102/glow040.gltf",
    "/gtlfFilesForHD1102/glow041.gltf",
    "/gtlfFilesForHD1102/glow042.gltf",
    "/gtlfFilesForHD1102/glow043.gltf",
    "/gtlfFilesForHD1102/glow044.gltf",
    "/gtlfFilesForHD1102/glow045.gltf",
    "/gtlfFilesForHD1102/glow046.gltf",
    "/gtlfFilesForHD1102/glow047.gltf",
    "/gtlfFilesForHD1102/glow048.gltf",
    "/gtlfFilesForHD1102/glow049.gltf",
    "/gtlfFilesForHD1102/glow050.gltf",
    "/gtlfFilesForHD1102/glow051.gltf",
    "/gtlfFilesForHD1102/glow052.gltf",
    "/gtlfFilesForHD1102/glow053.gltf",
    "/gtlfFilesForHD1102/glow054.gltf",
    "/gtlfFilesForHD1102/glow055.gltf",
    "/gtlfFilesForHD1102/glow056.gltf",
    "/gtlfFilesForHD1102/glow057.gltf",
    "/gtlfFilesForHD1102/glow058.gltf",
    "/gtlfFilesForHD1102/glow059.gltf",
    "/gtlfFilesForHD1102/glow060.gltf",
    "/gtlfFilesForHD1102/glow061.gltf",
    "/gtlfFilesForHD1102/glow062.gltf",
    "/gtlfFilesForHD1102/glow063.gltf",
    "./assets/gtlfFilesForHD1102/glow064.gltf",
    "/gtlfFilesForHD1102/glow065.gltf",
    "/gtlfFilesForHD1102/glow066.gltf",
    "/gtlfFilesForHD1102/glow067.gltf",
    "/gtlfFilesForHD1102/glow068.gltf",
    "/gtlfFilesForHD1102/glow069.gltf",
    "/gtlfFilesForHD1102/glow070.gltf",
    "/gtlfFilesForHD1102/glow071.gltf",
    "/gtlfFilesForHD1102/glow072.gltf",
    "/gtlfFilesForHD1102/glow073.gltf",
    "/gtlfFilesForHD1102/glow074.gltf",
    "/gtlfFilesForHD1102/glow075.gltf",
    "/gtlfFilesForHD1102/glow076.gltf",
    "/gtlfFilesForHD1102/glow077.gltf",
    "/gtlfFilesForHD1102/glow078.gltf",
    "/gtlfFilesForHD1102/glow079.gltf",
    "/gtlfFilesForHD1102/glow080.gltf",
    "/gtlfFilesForHD1102/glow081.gltf",
    "/gtlfFilesForHD1102/glow082.gltf",
    "/gtlfFilesForHD1102/glow083.gltf",
    "/gtlfFilesForHD1102/glow084.gltf",
    "/gtlfFilesForHD1102/glow085.gltf",
    "/gtlfFilesForHD1102/glow086.gltf",
    "/gtlfFilesForHD1102/glow087.gltf",
  ];

  return (
    <div>
      <Canvas
        id="ThreeJSScene"
        camera={{
          position: [0, 0, 4],
          fov: 75,
        }}
        style={{
          height: "50vh",
          width: "41%",
          position: "relative",
          top: "20px",
          left: "40px",
          borderRadius: "10px",
        }}
      >
        {isWhiteBackground ? (
          <color attach="background" args={["#ffffff"]} />
        ) : (
          <CubeBackground />
        )}
        <OrbitControls enableDamping dampingFactor={0.05} zoomSpeed={0.5} />
        <ModelTransition gltfFiles={gltfFiles} />
      </Canvas>
    </div>
  );
};

const PlanetTitle = ({ title }) => {
  return (
    <div className="text-6xl p-4 font-mono shadow-md ">
      <h2>{title}</h2>
    </div>
  );
};

const PlanetInfo = () => {
  return (
    <div
      className="absolute right-10 transform -translate-x-10 p-4 rounded-lg shadow-lg w-90 font-courier"
      style={{
        height: "50vh",
        top: "228px",
      }}
    >
      <h2 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">
        Planet System Details
      </h2>
      <ul className="space-y-2 text-sm">
        <li>
          <strong>Number of Planets:</strong> 6
        </li>
        <li>
          <strong>Observatory/Mission Name:</strong> Cheops
        </li>
        <li>
          <strong>Distance from Earth:</strong> 9.92 trillion miles
        </li>
        <li>
          <strong>Travel Time:</strong> 105 light-years
        </li>
        <li>
          <strong>Type of Star:</strong> K0V Star
        </li>
        <li>
          <strong>Star’s Age:</strong> 2.5 billion years old
        </li>
        <li>
          <strong>Star’s Mass:</strong> 0.798 times the Sun
        </li>
        <li>
          <strong>Discovery Year:</strong> 2023
        </li>
        <li>
          <strong>Discovery Method:</strong> Transit
        </li>
      </ul>
    </div>
  );
};

const BoxDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { title } = location.state || {};
  const [isWhiteBackground, setWhiteBackground] = useState(false);

  const toggleWhiteBackground = () => {
    setWhiteBackground(!isWhiteBackground);
  };

  function requestFullScreen() {
    const element = document.getElementById("ThreeJSScene");
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      // IE/Edge
      element.msRequestFullscreen();
    } else {
      console.log("Fullscreen API is not supported by your browser.");
    }
  }

  return (
    <div>
      <PlanetTitle title={title} />
      <PlanetInfo />
      <GoScreenFull
        style={{
          height: "5vh",
          width: "5%",
          position: "relative",
          top: "90px",
          left: "560px",
          zIndex: 10,
          color: "#00838F",
          cursor: "pointer",
        }}
        className="transform transition-all duration-300 ease-in-out hover:scale-105 "
        onClick={requestFullScreen}
      />
      <button
        style={{
          position: "relative",
          top: "60px",
          left: "50px",
          zIndex: 10,
        }}
        className="bg-cyan-800 text-white px-5 py-1 rounded text-sm hover:bg-cyan-700 transition-all"
        onClick={toggleWhiteBackground}
      >
        {isWhiteBackground ? "Space" : "White"}
      </button>

      <NewThreeJSSSCENEHD110067 isWhiteBackground={isWhiteBackground} />
    </div>
  );
};

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/:id" element={<BoxDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
