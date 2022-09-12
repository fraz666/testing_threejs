// Puoi fare così come react, top
import "./style.css";

// @ts-ignore
import Stats from "../lib/stats.min";
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, Scene, Vector3, WebGLRenderer } from "three";

import { UserControls } from "./controls/UserControls";
import { onKeyDown } from "./events/keyboard-helper";
import { onMouseClick, onMouseMove } from "./events/mouse-helper";
import { degToRad } from "three/src/math/MathUtils";
import { generateDebugLevel } from "./level/level-generator";



const stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1, // 1
  1000
);
camera.position.z = 5; // goes behind the cube

const user = new UserControls(camera);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

document.addEventListener( 'keydown', user.updateOnKeyboard );
document.addEventListener( 'keyup', user.updateOnKeyboard );
document.addEventListener( 'mousemove', user.updateOnMouseMove );
document.addEventListener( 'click', onMouseClick );

const debugLevel = generateDebugLevel(scene);

// ANIMATION LOOP
let prevTime = performance.now();

function animate() {

  stats.begin();

  // monitored code goes here

  const time = performance.now();

  // frame delta
  const delta = ( time - prevTime ) / 1000;
  
  // user
  user.update(delta);

  // environment
  debugLevel.update(delta);

  prevTime = time;

  renderer.render(scene, camera);

  stats.end();

  requestAnimationFrame(animate);
}

animate();
