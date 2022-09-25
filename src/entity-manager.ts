import { Entity } from './entity';

export class EntityManager {
  private ids: number;
  private entities: Entity[];
  private entitiesMap: { [name: string]: Entity };

  constructor() {
    this.ids = 0;
    this.entities = [];
    this.entitiesMap = {};
  }


  generateName(): string {
    this.ids += 1;
    return '__Name__' + this.ids;
  }

  get(name: string): Entity {
    return this.entitiesMap[name];
  }

  add(entity: Entity, name: string): void {
    if (!name) {
      name = this.generateName();
    }

    this.entitiesMap[name] = entity;
    this.entities.push(entity);

    entity.setName(name);
    entity.setParent(this);
  }

  update(timeElapsed: number): void {
    for (const entity of this.entities) {
      entity.update(timeElapsed);
    }
  }
}