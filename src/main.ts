import { PlayerEntity } from './player-entity';
// Puoi fare così come react, top
import './style.css';
// @ts-ignore
import Stats from './../lib/stats.min';
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, Scene, WebGLRenderer } from 'three';
import { UserControls } from './controls/UserControls';
import { onMouseClick } from './events/mouse-helper';
import { degToRad } from 'three/src/math/MathUtils';

import { io } from 'socket.io-client';


const socket = io('ws://localhost:3000', {
  reconnectionDelayMax: 10000,
});
const playersEntity: PlayerEntity[] = [];

socket.on('connect', () => {
  console.log('connected');
});

socket.on('player-joined', (player) => {
  console.log('player', player);
  playersEntity.push(new PlayerEntity({ scene, socketId: player.socketId }));
});
socket.on('player-leave', (socketId: string) => {
  console.log('leave player', socketId, playersEntity );
  const index = playersEntity.findIndex(x => x.getSocketId() === socketId);
  if (index > -1) {
    playersEntity[index].Remove();
    playersEntity.splice(index, 1);
  }
});

socket.on('create-players', (players) => {
  players.forEach(player => {
    playersEntity.push(new PlayerEntity({ scene, socketId: player.socketId }));
  });
});



const stats = new Stats();
stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1, // 1
  1000
);
camera.position.z = 5; // goes behind the cube
camera.position.y = 0.5;

const userControls = new UserControls(camera);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

document.addEventListener('keydown', (e) => userControls.updateOnKeyboard(e));
document.addEventListener('keyup', (e) => userControls.updateOnKeyboard(e));
document.addEventListener('mousemove', (e) => userControls.updateOnMouseMove(e));
document.addEventListener('click', onMouseClick);

// 3D environment
// const geometry = new BoxGeometry(1, 1, 1);
// const material = new MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new Mesh(geometry, material);
// scene.add(cube);

const plane = new Mesh(
  new PlaneGeometry(30, 30),
  new MeshBasicMaterial({ color: 0xff0000 })
);
plane.rotation.x = degToRad(-90);
plane.position.y = -1;
scene.add(plane);
// console.log(plane)

/**
 * ANIMATE LOOP
 */

let prevTime = performance.now();


const animate = () => {

  stats.begin();

  // monitored code goes here

  const time = performance.now();

  // frame delta
  const delta = (time - prevTime) / 1000;

  // user
  userControls.update(delta);

  // environment
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;



  //console.log(camera.position)
  //camera.position.x += 0.01;

  prevTime = time;

  renderer.render(scene, camera);

  stats.end();

  requestAnimationFrame(animate);
};


animate();
