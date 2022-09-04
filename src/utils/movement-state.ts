import { Vector3 } from "three";

export class MovementState {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;

    constructor(
        f: boolean = false, 
        b: boolean = false, 
        l: boolean = false, 
        r: boolean = false
    ) {
        this.forward = f;
        this.backward = b;
        this.left = l;
        this.right = r;
    }

    copy(): MovementState {
        return new MovementState(
            this.forward,
            this.backward,
            this.left,
            this.right,
        );
    }

    getDirection(): Vector3 {
        const direction = new Vector3();

        if (this.forward) {
            direction.z = +1;
        }

        if (this.backward) {
            direction.z = -1;
        }

        if (this.right) {
            direction.x = +1;
        }

        if (this.left) {
            direction.x = -1;
        }

        direction.normalize(); // this ensures consistent movements in all directions

        return direction;
    }
}