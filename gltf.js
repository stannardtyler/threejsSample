////- Importing the goods -///
import * as THREE from "/build/three.module.js"; //this loads the main threejs library
import { GLTFLoader } from "/loaders/GLTFLoader.js"; //this loads the gltf loader plugin
import { TrackballControls } from "/controls/TrackballControls2.js"; //this loads the trackball controls plugin

////- Create variables for the objects in the scene -////
let camera, scene, renderer, controls;

let model; //variable for the model

init();
animate();

//this function initializes the sketch
function init() {
  const container = document.getElementById("container");
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  //setting up the camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );

  //setting the camera positions and controls
  camera.position.set(0, 0, 30);
  controls = new TrackballControls(camera, renderer.domElement);
  controls.rotateSpeed = 2.0;
  controls.panSpeed = 0.8;
  controls.zoomSpeed = 1.5;

  //creating a new threejs scene
  scene = new THREE.Scene();


  //adding lights
  const hemisphereLight = new THREE.HemisphereLight(0xfceafc, 0x000000, 1);
  scene.add(hemisphereLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(150, 75, 150);
  scene.add(dirLight);

  const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.2);
  dirLight2.position.set(-150, 75, -150);
  scene.add(dirLight2);

  const dirLight3 = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight3.position.set(0, 125, 0);
  scene.add(dirLight3);

  window.addEventListener("resize", onWindowResize);

  /////-- gltf loader --/////
  // Instantiate a loader
  const loader = new GLTFLoader();

  // Load a glTF resource
  loader.load(
    // resource URL
    "models/tree_down.glb",
    // called when the resource is loaded
    function (gltf) {
      scene.add(gltf.scene);

      model = gltf.scene;

      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Group
      gltf.scenes; // Array<THREE.Group>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object
      model.scale.set(10, 10, 10); // Object Scale
      model.position.y = 1; // Object Position
    },
    // called while loading is progressing
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
      console.log("An error happened");
    }
  );
}

//render camera view to screen size
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

//update function
function update() {
  controls.update();
}

//animate function - calls update and render
function animate() {
  update();
  render();

  renderer.render(scene, camera);
}

// render function
function render() {
  window.requestAnimationFrame(animate); //had to move the request for animationframe in ther renderer
}
