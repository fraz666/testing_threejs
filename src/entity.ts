import { EntityManager } from './entity-manager';
import { Quaternion, Vector3 } from 'three';

export class Entity {
  private entityName: string;
  private parent: EntityManager | null; // Any or entity manager??;
  private components: { [name: string]: Component };
  private position: Vector3;
  private rotation: Quaternion;
  private handlers: { [name: string]: unknown };

  constructor() {
    this.entityName = '';
    this.components = {};
    this.position = new Vector3();
    this.rotation = new Quaternion();
    this.parent = null;
    this.handlers = {};
  }

  get name(): string {
    return this.entityName;
  }

  setName(name: string) {
    this.entityName = name;
  }

  setParent(parent: EntityManager): void {
    this.parent = parent;
  }

  findEntity(name: string) {
    return this.parent?.get(name);
  }

  setPosition(position: Vector3): void {
    this.position.copy(position);
    // TODO ... Update broadcast
  }

  setRotation(rotation: Quaternion): void {
    this.rotation.copy(rotation);
    // TODO ... Update broadcast
  }

  addComponent(component: Component): void {
    component.setParent(this);
    this.components[component.constructor.name] = component;

    component.initComponent();
  }

  getComponent(name: string): Component {
    return this.components[name];
  }

  update(timeElapsed: number): void {
    for (const [key, component] of Object.entries(this.components)) {
      this.components[key].update(timeElapsed);
    }
  }

}


export class Component {
  private _parent: Entity | null;

  constructor() {
    this._parent = null;
  }

  get parent(): Entity | null {
    return this._parent;
  }
  update(timeElapsed: number): void {
    return;
  }

  setParent(e: Entity): void {
    this._parent = e;
  }

  initComponent(): void {
    return;
  }
}