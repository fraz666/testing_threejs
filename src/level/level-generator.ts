import { BoxGeometry, Mesh, MeshBasicMaterial, PlaneGeometry, Scene } from "three"
import { degToRad } from "three/src/math/MathUtils";
import { RenderNode } from "../utils/render-node"

class DebugLevel implements RenderNode {

    cubeMesh: Mesh;
    planeMesh: Mesh;

    constructor() {
        this.cubeMesh = new Mesh(
            new BoxGeometry(1, 1, 1),
            new MeshBasicMaterial({ color: 0x00ff00 }),
        );

        this.planeMesh = new Mesh(
            new PlaneGeometry(30, 30),
            new MeshBasicMaterial({color: 0xff0000})
        );
        this.planeMesh.rotation.x = degToRad(-90);
        this.planeMesh.position.y = -5;
        
    }

    update(delta: number): void {
        this.cubeMesh.rotation.x += 0.5 * delta;
        this.cubeMesh.rotation.y += 0.5 * delta;
    }

}

export const generateDebugLevel = (scene: Scene): RenderNode => {
    const dbgLvl = new DebugLevel();
    
    scene.add(dbgLvl.cubeMesh);
    scene.add(dbgLvl.planeMesh);

    return dbgLvl;
}