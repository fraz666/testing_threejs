import {
  Euler,
  PerspectiveCamera,
  Vector3
} from 'three';
import { MovementState } from '../utils/movement-state';

const EULER = new Euler(0, 0, 0, 'YXZ');

const SPEED = 100.0;

// const _changeEvent = { type: 'change' };
// const _lockEvent = { type: 'lock' };
// const _unlockEvent = { type: 'unlock' };

const _PI_2 = Math.PI / 2;

class UserControls {

  private minPolarAngle: number;
  private maxPolarAngle: number;
  private pointerSpeed: number;

  private direction: Vector3;
  private velocity: Vector3;

  private camera: PerspectiveCamera;

  private movementState: MovementState;

  constructor(camera: PerspectiveCamera) {

    this.camera = camera;

    // Set to constrain the pitch of the camera
    // Range is 0 to Math.PI radians
    this.minPolarAngle = 0; // radians
    this.maxPolarAngle = Math.PI; // radians

    this.pointerSpeed = 1.0;

    this.direction = new Vector3();
    this.velocity = new Vector3();

    this.movementState = new MovementState();
  }

  update(delta: number) {
    this.velocity.x -= this.velocity.x * 10.0 * delta;
    this.velocity.z -= this.velocity.z * 10.0 * delta;

    // forward/backward
    if (this.movementState.forward || this.movementState.backward) {
      this.velocity.z -= this.direction.z * SPEED * delta;
    }

    const fbVect = new Vector3();
    fbVect.setFromMatrixColumn(this.camera.matrix, 0);
    fbVect.crossVectors(this.camera.up, fbVect);
    this.camera.position.addScaledVector(fbVect, -this.velocity.z * delta);

    // left/right
    if (this.movementState.left || this.movementState.right) {
      this.velocity.x -= this.direction.x * SPEED * delta;
    }

    const lrVect = new Vector3();
    lrVect.setFromMatrixColumn(this.camera.matrix, 0);
    this.camera.position.addScaledVector(lrVect, -this.velocity.x * delta);
  }

  // TODO use custom wrapped events
  updateOnMouseMove(event: any) {

    const movementX = event.movementX;
    const movementY = event.movementY;

    EULER.setFromQuaternion(this.camera.quaternion);

    EULER.y -= movementX * 0.002 * this.pointerSpeed;
    EULER.x -= movementY * 0.002 * this.pointerSpeed;

    EULER.x = Math.max(_PI_2 - this.maxPolarAngle, Math.min(_PI_2 - this.minPolarAngle, EULER.x));

    this.camera.quaternion.setFromEuler(EULER);
  }

  // TODO use custom wrapped events
  updateOnKeyboard(event: any) {

    //console.log(event.type, event.code);

    this.movementState = this.updateMovementState(event, this.movementState);
    this.direction = this.movementState.getDirection();

    //console.log(this.movementState, this.direction);
  }

  private updateMovementState(event: any, prev: MovementState): MovementState {
    const mvs = prev.copy();
    const isMoveEvent = event.type == 'keydown';

    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        mvs.forward = isMoveEvent;
        break;

      case 'ArrowDown':
      case 'KeyS':
        mvs.backward = isMoveEvent;
        break;

      case 'ArrowRight':
      case 'KeyD':
        mvs.right = isMoveEvent;
        break;

      case 'ArrowLeft':
      case 'KeyA':
        mvs.left = isMoveEvent;
        break;

    }

    //direction.normalize(); // this ensures consistent movements in all directions
    return mvs;
  }
}

export { UserControls };