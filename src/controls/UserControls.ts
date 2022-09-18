import {
	Euler,
	EventDispatcher,
	PerspectiveCamera,
	Vector3
} from 'three';
import { MovementState } from '../utils/movement-state';
import { State, StateMachine } from '../utils/state-machine';

const EULER = new Euler(0, 0, 0, 'YXZ');

const SPEED: number = 400.0;

// const _changeEvent = { type: 'change' };
// const _lockEvent = { type: 'lock' };
// const _unlockEvent = { type: 'unlock' };

const _PI_2 = Math.PI / 2;

// TODO move to general entity 
enum UserStates {
	IDLE = 'IDLE',
	WALK = 'WALK',
	RUN = 'RUN',
	JUMP = 'JUMP',
	SLIDE = 'SLIDE'
};

class UserControls {

	private minPolarAngle: number;
	private maxPolarAngle: number;
	private pointerSpeed: number;

	private direction: Vector3;
	private velocity: Vector3;

	private camera: PerspectiveCamera;

	private movementState: MovementState;
	private stateMachine: StateMachine;

	//private helperElement: Element = null;

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

		const states: State[] = [
			{ id: UserStates.IDLE },
			{ id: UserStates.WALK },
			{ id: UserStates.RUN },
			{ id: UserStates.JUMP },
			{ id: UserStates.SLIDE },
		];
		this.stateMachine = new StateMachine(states, states[0]);
	}

	update = (delta: number) => {
		this.velocity.x -= this.velocity.x * 10.0 * delta;
		this.velocity.z -= this.velocity.z * 10.0 * delta;

		// forward/backward
		if (this.movementState.forward || this.movementState.backward) {
			this.velocity.z -= this.direction.z * SPEED * delta;
		}		

		const fbVect = new Vector3();
		fbVect.setFromMatrixColumn( this.camera.matrix, 0 );
		fbVect.crossVectors(this.camera.up, fbVect);
		this.camera.position.addScaledVector( fbVect, -this.velocity.z * delta );

		// left/right
		if (this.movementState.left || this.movementState.right) {
			this.velocity.x -= this.direction.x * SPEED * delta;
		}

		const lrVect = new Vector3();
		lrVect.setFromMatrixColumn( this.camera.matrix, 0 );
		this.camera.position.addScaledVector( lrVect, -this.velocity.x * delta );

		// // jump
		// this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
		// this.velocity.y += this.direction.y * 350; // height of jump		

		// //const velocitY = Math.max( 0, this.velocity.y);
		// const velocitY = this.velocity.y;
		// this.camera.position.y += ( velocitY * delta );

		// if (this.camera.position.y < 5) { 
		// 	this.velocity.y = 0;
		// 	this.camera.position.y = 5
		// }

		// console.log(this.direction);
	}

	// TODO use custom wrapped events
	updateOnMouseMove = (event: any) => {

		const movementX = event.movementX;
		const movementY = event.movementY;

		EULER.setFromQuaternion(this.camera.quaternion);

		EULER.y -= movementX * 0.002 * this.pointerSpeed;
		EULER.x -= movementY * 0.002 * this.pointerSpeed;

		EULER.x = Math.max(_PI_2 - this.maxPolarAngle, Math.min(_PI_2 - this.minPolarAngle, EULER.x));

		this.camera.quaternion.setFromEuler(EULER);
	}

	// TODO use custom wrapped events
	updateOnKeyboard = (event: any) => {

		//console.log(event.type, event.code);

		this.movementState = this.updateMovementState(event, this.movementState);
		this.direction = this.movementState.getDirection();

		//console.log(this.movementState, this.direction);
	}

	// attachHelperElement = (element: Element) => {
	// 	this.helperElement = element;
	// }

	private updateMovementState(event: any, prev: MovementState): MovementState {
		const mvs = prev.copy();
		const isMoveEvent = event.type == "keydown";

		mvs.jump = false;

		switch ( event.code ) {

			case 'ArrowUp':
			case 'KeyW':
				mvs.forward = isMoveEvent;
				this.stateMachine.update({ id: isMoveEvent ? UserStates.WALK : UserStates.IDLE});
				break;

			case 'ArrowDown':
			case 'KeyS':
				mvs.backward = isMoveEvent;
				this.stateMachine.update({ id: isMoveEvent ? UserStates.WALK : UserStates.IDLE});
				break;

			case 'ArrowRight':
			case 'KeyD':
				mvs.right = isMoveEvent;
				this.stateMachine.update({ id: isMoveEvent ? UserStates.WALK : UserStates.IDLE});
				break;

			case 'ArrowLeft':
			case 'KeyA':
				mvs.left = isMoveEvent;
				this.stateMachine.update({ id: isMoveEvent ? UserStates.WALK : UserStates.IDLE});
				break;

			case 'Space':
				mvs.jump = isMoveEvent;
				this.stateMachine.update({ id: isMoveEvent ? UserStates.JUMP : UserStates.IDLE});
				break;

		}

		console.log(this.stateMachine.get().id);
		//direction.normalize(); // this ensures consistent movements in all directions
		return mvs;
	}
}

export { UserControls };