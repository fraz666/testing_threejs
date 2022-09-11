import { BoxGeometry, Mesh, MeshBasicMaterial, Scene } from 'three';

export class PlayerEntity {
  private scene: Scene;
  private socketId: string;
  private element;

  constructor(params: any) {
    this.scene = params.scene;
    this.socketId = params.socketId;

    const geometry = new BoxGeometry(1, 2, 1);
    const material = new MeshBasicMaterial({ color: 0xdddddd });
    this.element = new Mesh(geometry, material);
    this.scene.add(this.element);

    this.element.position.set(0, 0, 0);
  }

  getSocketId(): string {
    return this.socketId;
  }

  Remove(): void {
    this.scene.remove(this.element);
  }

  Update(elapsedTime: number): void {
    return;
  }

  setPosition(x: number, y: number, z: number) {
    this.element.position.set(x, y, z);
  }

  getPosition(): { x: number, y: number, z: number } {
    return this.element.position;
  }

}