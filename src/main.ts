// Puoi fare così come react, top
import "./style.css";

// @ts-ignore
import Stats from "../lib/stats.min";
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";

//import { PointerLockControls } from "./controls/PointerLockControls";
import { onKeyDown } from "./events/keyboard-helper";
import { onMouseMove } from "./events/mouse-helper";

var isLocked = false;

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
camera.position.z = 5;

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const controls = new PointerLockControls( camera, document.body );
// scene.add(controls);

// utils
// const blocker = document.getElementById( 'blocker' );
// if (blocker == null) {
//   throw 'Unable to locate the blocker element';
// }

// const instructions = document.getElementById( 'instructions' );
// if (instructions == null) {
//   throw 'Unable to locate the instructions element';
// }

// instructions.addEventListener( 'click', function () {

//   controls.lock();

// } );

// controls.addEventListener( 'lock', function () {

//   instructions.style.display = 'none';
//   blocker.style.display = 'none';

// } );

// controls.addEventListener( 'unlock', function () {

//   blocker.style.display = 'block';
//   instructions.style.display = '';

// } );

document.addEventListener( 'keydown', onKeyDown );
document.addEventListener( 'mousemove', onMouseMove );

// 3D environment
const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({ color: 0x00ff00 });
const cube = new Mesh(geometry, material);
scene.add(cube);

// animation loop
let prevTime = performance.now();

function animate() {

  stats.begin();

  const time = performance.now();

  // frame delta
  const delta = ( time - prevTime ) / 1000;

  // monitored code goes here
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  prevTime = time;

  renderer.render(scene, camera);

  stats.end();

  requestAnimationFrame(animate);
}

animate();
