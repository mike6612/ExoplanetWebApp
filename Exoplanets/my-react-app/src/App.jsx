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
import { DeviceOrientationControls, OrbitControls } from "@react-three/drei";

const SignupComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    setError(""); // Clear errors if validation passes
    console.log("Logging in with:", { email, password });

    // Simulate login logic (replace with API call)
    alert("Login successful!");
  };

  return (
    <div className="login-container">
      <h2 style={{ color: "black" }}>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            style={{
              width: "200px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "5px",
              border: "2px solid transparent",
              outline: "none",
            }}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <input
            style={{
              width: "200px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "5px",
              border: "2px solid transparent",
              outline: "none",
              marginTop: 10,
            }}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ marginTop: 20, width: "160px" }}>
          Signup
        </button>
      </form>
    </div>
  );
};
const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    setError("");
    console.log("Logging in with:", { email, password });

    alert("Login successful!");
  };

  return (
    <div className="login-container">
      <h2 style={{ color: "black" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            style={{
              width: "200px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "5px",
              border: "2px solid transparent",
              outline: "none",
            }}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <input
            style={{
              width: "200px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "5px",
              border: "2px solid transparent",
              outline: "none",
              marginTop: 10,
            }}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ marginTop: 20, width: "160px" }}>
          Login
        </button>
      </form>

      <p style={{ marginTop: 15, color: "black" }}>
        Don't have an account yet?{" "}
        <a
          href="/static/register" // Replace with your actual registration page path
          style={{
            color: "black",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Register here
        </a>
      </p>
    </div>
  );
};

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
      details: {
        numofPlanets: "6",
        missionName: "Cheops",
        distanceFromEarth: "9.92 trillion miles",
        travelTime: "105 light-years",
        starType: "K0V Star",
        starAge: "2.5 billion years old",
        starMass: "0.798 times the Sun",
        discoveryYear: "2023",
        discoveryMethod: "Transit",
      },
      gltfFiles: [
        "/HD-110067/000.gltf",
        "/HD-110067/001.gltf",
        "/HD-110067/002.gltf",
        "/HD-110067/003.gltf",
        "/HD-110067/004.gltf",
        "/HD-110067/005.gltf",
        "/HD-110067/006.gltf",
        "/HD-110067/007.gltf",
        "/HD-110067/008.gltf",
        "/HD-110067/009.gltf",
        "/HD-110067/010.gltf",
        "/HD-110067/011.gltf",
        "/HD-110067/012.gltf",
        "/HD-110067/013.gltf",
        "/HD-110067/014.gltf",
        "/HD-110067/015.gltf",
        "/HD-110067/016.gltf",
        "/HD-110067/017.gltf",
        "/HD-110067/018.gltf",
        "/HD-110067/019.gltf",
        "/HD-110067/020.gltf",
        "/HD-110067/021.gltf",
        "/HD-110067/022.gltf",
        "/HD-110067/023.gltf",
        "/HD-110067/024.gltf",
        "/HD-110067/025.gltf",
        "/HD-110067/026.gltf",
        "/HD-110067/027.gltf",
        "/HD-110067/028.gltf",
        "/HD-110067/029.gltf",
        "/HD-110067/030.gltf",
        "/HD-110067/031.gltf",
        "/HD-110067/032.gltf",
        "/HD-110067/033.gltf",
        "/HD-110067/034.gltf",
        "/HD-110067/035.gltf",
        "/HD-110067/036.gltf",
        "/HD-110067/037.gltf",
        "/HD-110067/038.gltf",
        "/HD-110067/039.gltf",
        "/HD-110067/040.gltf",
        "/HD-110067/041.gltf",
        "/HD-110067/042.gltf",
        "/HD-110067/043.gltf",
        "/HD-110067/044.gltf",
        "/HD-110067/045.gltf",
        "/HD-110067/046.gltf",
        "/HD-110067/047.gltf",
        "/HD-110067/048.gltf",
        "/HD-110067/049.gltf",
        "/HD-110067/050.gltf",
        "/HD-110067/051.gltf",
        "/HD-110067/052.gltf",
        "/HD-110067/053.gltf",
        "/HD-110067/054.gltf",
        "/HD-110067/055.gltf",
        "/HD-110067/056.gltf",
        "/HD-110067/057.gltf",
        "/HD-110067/058.gltf",
        "/HD-110067/059.gltf",
        "/HD-110067/060.gltf",
        "/HD-110067/061.gltf",
        "/HD-110067/062.gltf",
        "/HD-110067/063.gltf",
        "/HD-110067/064.gltf",
        "/HD-110067/065.gltf",
        "/HD-110067/066.gltf",
        "/HD-110067/067.gltf",
        "/HD-110067/068.gltf",
        "/HD-110067/069.gltf",
        "/HD-110067/070.gltf",
        "/HD-110067/071.gltf",
        "/HD-110067/072.gltf",
        "/HD-110067/073.gltf",
        "/HD-110067/074.gltf",
        "/HD-110067/075.gltf",
        "/HD-110067/076.gltf",
        "/HD-110067/077.gltf",
        "/HD-110067/078.gltf",
        "/HD-110067/079.gltf",
        "/HD-110067/080.gltf",
        "/HD-110067/081.gltf",
        "/HD-110067/082.gltf",
        "/HD-110067/083.gltf",
        "/HD-110067/084.gltf",
        "/HD-110067/085.gltf",
        "/HD-110067/086.gltf",
        "/HD-110067/087.gltf",
      ],
      cameraPosition: [10, 3, 10],
    },
    {
      id: "DMPP-1",
      title: "DMPP-1",
      image:
        "https://images.unsplash.com/photo-1464802686167-b939a6910659?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FsYXh5fGVufDB8fDB8fHww",
      details: {
        numofPlanets: "4",
        missionName: "DMPP",
        distanceFromEarth: "200 light-years",
        travelTime: "200 years at light speed",
        starType: "F8V Star",
        starAge: "3.6 billion years old",
        starMass: "1.1 times the Sun",
        discoveryYear: "2019",
        discoveryMethod: "Radial Velocity",
      },
      gltfFiles: ["/DMPP-1/000.gltf", "/DMPP-1/001.gltf", "/DMPP-1/002.gltf"],
      cameraPosition: [1.5, 0.5, 1.5],
    },
  ];
  const handleBoxClick = (id, title, details, gltfFiles, cameraPosition) => {
    navigate(`/${id}`, {
      state: { title, details, gltfFiles, cameraPosition },
    });
  };

  return (
    <main className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {boxes.map((box, index) => (
          <Box
            key={index}
            title={box.title}
            image={box.image}
            handleClick={() =>
              handleBoxClick(
                box.id,
                box.title,
                box.details,
                box.gltfFiles,
                box.cameraPosition
              )
            }
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

const ModelTransition = ({ gltfFiles, interval = 3800 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentModel, setCurrentModel] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();

    const loadModel = () => {
      loader.load(gltfFiles[currentIndex], (gltf) => {
        // Traverse through all child objects of the loaded model
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            // Modify the material here
            child.material = new THREE.MeshBasicMaterial({
              map: child.material.map, // Use the existing texture
              color: 0xffffff, // Set color to white (ignores lighting)
              emissive: 0x000000, // Optional: Emissive lighting (turn off)
            });
          }
        });

        // After modifying the material, set the scene
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

const NewThreeJSSSCENEHD110067 = ({
  isWhiteBackground,
  gltfFiles,
  cameraPosition,
}) => {
  return (
    <div>
      <Canvas
        id="ThreeJSScene"
        camera={{
          position: cameraPosition,
          far: 1000,
        }}
        style={{
          height: "50vh",
          width: "41%",
          position: "relative",
          top: "20px",
          left: "40px",
          borderRadius: "10px",
        }}
        environment={null}
      >
        {isWhiteBackground ? (
          <color attach="background" args={["#ffffff"]} />
        ) : (
          <CubeBackground />
          //   <color attach="background" args={["#000000"]} />
        )}
        <ambientLight intensity={10} /> Really bright ambient light
        {/* Add multiple directional lights */}
        <directionalLight intensity={8} position={[10, 20, 10]} />
        <directionalLight intensity={8} position={[-10, 20, 10]} />
        <directionalLight intensity={8} position={[0, 20, 10]} />
        <directionalLight intensity={8} position={[10, -20, 10]} />
        {/* Add additional directional lights on the opposite side */}
        <directionalLight intensity={8} position={[-10, 20, -10]} />
        <directionalLight intensity={8} position={[10, 20, -10]} />
        {/* Add multiple point lights */}
        <pointLight intensity={6} position={[-10, 10, -10]} />
        <pointLight intensity={6} position={[10, 10, -10]} />
        <pointLight intensity={6} position={[-10, -10, -10]} />
        <pointLight intensity={6} position={[10, -10, -10]} />
        {/* Add additional point lights on the opposite side */}
        <pointLight intensity={6} position={[-10, 10, 10]} />
        <pointLight intensity={6} position={[10, 10, 10]} />
        <pointLight intensity={6} position={[-10, -10, 10]} />
        <pointLight intensity={6} position={[10, -10, 10]} />
        {/* Add multiple spotlights */}
        <spotLight intensity={6} position={[0, 15, 0]} angle={0.5} />
        <spotLight intensity={6} position={[5, 15, 5]} angle={0.5} />
        <spotLight intensity={6} position={[-5, 15, -5]} angle={0.5} />
        {/* Add additional spotlights on the opposite side */}
        <spotLight intensity={6} position={[0, 15, 5]} angle={0.5} />
        <spotLight intensity={6} position={[-5, 15, 5]} angle={0.5} />
        <spotLight intensity={6} position={[5, 15, -5]} angle={0.5} />
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

const PlanetInfo = ({ details }) => {
  return (
    <div className="absolute right-10 transform -translate-x-10 p-4 rounded-lg shadow-lg w-90 font-courier h-[50vh] top-[263px]">
      <h2 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">
        Planet System Details
      </h2>
      <ul className="space-y-2 text-sm">
        <li>
          <strong>Number of Planets:</strong> {details.numofPlanets}
        </li>
        <li>
          <strong>Observatory/Mission Name:</strong> {details.missionName}
        </li>
        <li>
          <strong>Distance from Earth:</strong> {details.distanceFromEarth}
        </li>
        <li>
          <strong>Travel Time:</strong> {details.travelTime}
        </li>
        <li>
          <strong>Type of Star:</strong> {details.starType}
        </li>
        <li>
          <strong>Star’s Age:</strong>
          {details.starAge}
        </li>
        <li>
          <strong>Star’s Mass:</strong> {details.starMass}
        </li>
        <li>
          <strong>Discovery Year:</strong> {details.discoveryYear}
        </li>
        <li>
          <strong>Discovery Method:</strong> {details.discoveryMethod}
        </li>
      </ul>
    </div>
  );
};

const BoxDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { title, details, gltfFiles, cameraPosition } = location.state || {};
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
      <PlanetInfo details={details} />
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

      <NewThreeJSSSCENEHD110067
        isWhiteBackground={isWhiteBackground}
        gltfFiles={gltfFiles}
        cameraPosition={cameraPosition}
      />
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
