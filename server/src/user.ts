export class User {
  private id: number;
  private socketId: string;
  private position: { x: number, y: number, z: number };

  constructor(connectionId: string) {
    this.socketId = connectionId;
    this.id = Math.floor((Math.random() * 10000) + 1);
    this.position = { x: 0, y: 0, z: 0 };
  }

  getSocketId(): string {
    return this.socketId;
  }

  setPosition(x: number, y: number, z: number): void {
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
  }
}