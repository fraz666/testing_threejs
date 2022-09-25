import { Vector3, Mesh, BoxGeometry, MeshBasicMaterial } from 'three';
import { Component } from './entity';
export class BasicCharacterController extends Component {
  private position: Vector3;
  private params: any;
  private target?: Mesh;

  constructor(params: any) {
    super();
    this.position = new Vector3();
    this.init(params);
  }

  init(params: any): void {
    this.params = params;
    console.log('test');
    this.position.copy(new Vector3(0, 0.5, 0));
    this.parent?.setPosition(this.position);
    this.loadModels();
    return;
  }


  loadModels(): void {
    console.log('ciao', this.params);
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0xffff00 });
    this.target = new Mesh(geometry, material);
    this.target.position.copy(this.position);
    this.params.scene.add(this.target);
    return;
  }

}