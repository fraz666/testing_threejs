import { BoxGeometry, ColorRepresentation, Mesh, MeshBasicMaterial, PlaneGeometry, Scene, Vector2 } from "three"
import { degToRad } from "three/src/math/MathUtils";
import { RenderNode } from "../utils/render-node"

class DebugLevelSection implements RenderNode {

    private rndNum: number;

    cubeMesh: Mesh;
    planeMesh: Mesh;

    constructor(
        color: ColorRepresentation,
        originXZ: Vector2,
    ) {

        this.rndNum = this.getRandom();

        this.cubeMesh = new Mesh(
            new BoxGeometry(1, 1, 1),
            new MeshBasicMaterial({ color: 0x00ff00 }),
        );
        this.cubeMesh.position.x = originXZ.x;
        this.cubeMesh.position.z = originXZ.y;

        this.planeMesh = new Mesh(
            new PlaneGeometry(30, 30),
            new MeshBasicMaterial({ color })
        );
        this.planeMesh.rotation.x = degToRad(-90);
        this.planeMesh.position.y = -5;
        this.planeMesh.position.x = originXZ.x;
        this.planeMesh.position.z = originXZ.y;
    }

    update(delta: number): void {
        this.cubeMesh.rotation.x += 0.5 * this.rndNum * delta;
        this.cubeMesh.rotation.y += 0.5 * this.rndNum * delta;
    }

    private getRandom() {
        return Math.random() * 2 - 1;
    }
}

class DebugLevel implements RenderNode {

    sections: DebugLevelSection[];

    constructor(scene: Scene) {

        this.sections = [
            new DebugLevelSection(0xff0000, new Vector2(0, 0)),
            new DebugLevelSection(0x8931ef, new Vector2(30, 30)),
            new DebugLevelSection(0xf2ca19, new Vector2(30,-30)),
            new DebugLevelSection(0xff00bd, new Vector2(-30,-30)),
            new DebugLevelSection(0x0057e9, new Vector2(-30,30)),
        ];

        this.sections.forEach(s => {
            scene.add(s.cubeMesh);
            scene.add(s.planeMesh);
        });

    }

    update(delta: number): void {
        this.sections.forEach(s => s.update(delta));
    }

}

export const generateDebugLevel = (scene: Scene): RenderNode => {
    return new DebugLevel(scene);
}