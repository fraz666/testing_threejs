import { BasicCharacterController } from './basic-character-controller';
import { EntityManager } from './entity-manager';
// Puoi fare così come react, top
import "./style.css";

// @ts-ignore
import Stats from "../lib/stats.min";
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Entity } from './entity';



const stats = new Stats();
stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);


const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 1;
controls.maxDistance = 500;

const plane = new Mesh(
  new PlaneGeometry(500, 500, 10, 10),
  new MeshBasicMaterial({color: 0x1e601c})
);
plane.rotation.x = -Math.PI / 2;

scene.add(plane);


const entityManager = new EntityManager();


const player = new Entity();
player.addComponent(new BasicCharacterController({scene: scene}));
entityManager.add(player, 'Player1');

camera.position.z = 5;

function animate() {

  stats.begin();

  controls.update();

  // monitored code goes here
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  entityManager.update(1); // calculate timeElapsed

  renderer.render(scene, camera);

  stats.end();

  requestAnimationFrame(animate);
}

animate();
