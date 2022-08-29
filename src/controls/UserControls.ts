import {
	Euler,
	EventDispatcher,
	PerspectiveCamera,
	Vector3
} from 'three';

const EULER = new Euler(0, 0, 0, 'YXZ');

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

	constructor(camera: PerspectiveCamera) {

		this.camera = camera;

		// Set to constrain the pitch of the camera
		// Range is 0 to Math.PI radians
		this.minPolarAngle = 0; // radians
		this.maxPolarAngle = Math.PI; // radians

		this.pointerSpeed = 1.0;

		this.direction = new Vector3();
		this.velocity = new Vector3();
	}

	update = (delta: number) => {
		this.velocity.x -= this.velocity.x * 10.0 * delta;
		this.velocity.z -= this.velocity.z * 10.0 * delta;

		// forward
		const v2 = new Vector3();
		v2.setFromMatrixColumn( this.camera.matrix, 0 );
		v2.crossVectors(this.camera.up, v2);
		this.camera.position.addScaledVector( v2, -this.velocity.z * delta );

		// strafe
		const v1 = new Vector3();
		v1.setFromMatrixColumn( this.camera.matrix, 0 );
		this.camera.position.addScaledVector( v1, -this.velocity.x * delta );
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
	updateOnKeyPress = (event: any) => {

		this.direction = this.generateDirectionVector(event);

		// this.camera.position.z += direction.z * 0.1;
		// this.camera.position.x += direction.x * 0.1;
	}

	private generateDirectionVector(event: any) {
		const direction = new Vector3();

		switch ( event.code ) {

			case 'ArrowUp':
			case 'KeyW':
				direction.z = -1;
				break;

			case 'ArrowDown':
			case 'KeyS':
				direction.z = +1;
				break;

			case 'ArrowRight':
			case 'KeyD':
				direction.x = +1;
				break;

			case 'ArrowLeft':
			case 'KeyA':
				direction.x = -1;
				break;

		}

		//direction.normalize(); // this ensures consistent movements in all directions
		return direction;
	}

	// constructor( camera: PerspectiveCamera) {

	// 	super();

	// 	if ( this.domElement === undefined ) {
	// 		console.error( 'CUSTOM.PointerLockControls: The "domElement" is not available.' );
	// 	}

	// 	this.isLocked = false;



	// 	const scope = this;

	// 	function onMouseMove( event ) {

	// 		if ( scope.isLocked === false ) return;

	// 		const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
	// 		const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

	// 		_euler.setFromQuaternion( camera.quaternion );

	// 		_euler.y -= movementX * 0.002 * scope.pointerSpeed;
	// 		_euler.x -= movementY * 0.002 * scope.pointerSpeed;

	// 		_euler.x = Math.max( _PI_2 - scope.maxPolarAngle, Math.min( _PI_2 - scope.minPolarAngle, _euler.x ) );

	// 		camera.quaternion.setFromEuler( _euler );

	// 		scope.dispatchEvent( _changeEvent );

	// 	}

	// 	function onPointerlockChange() {

	// 		if ( scope.domElement.ownerDocument.pointerLockElement === scope.domElement ) {

	// 			scope.dispatchEvent( _lockEvent );

	// 			scope.isLocked = true;

	// 		} else {

	// 			scope.dispatchEvent( _unlockEvent );

	// 			scope.isLocked = false;

	// 		}

	// 	}









	// 	this.moveForward = function ( distance ) {

	// 		// move forward parallel to the xz-plane
	// 		// assumes camera.up is y-up

	// 		_vector.setFromMatrixColumn( camera.matrix, 0 );

	// 		_vector.crossVectors( camera.up, _vector );

	// 		camera.position.addScaledVector( _vector, distance );

	// 	};

	// 	this.moveRight = function ( distance ) {

	// 		_vector.setFromMatrixColumn( camera.matrix, 0 );

	// 		camera.position.addScaledVector( _vector, distance );

	// 	};



}

export { UserControls };