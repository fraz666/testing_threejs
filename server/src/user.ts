export class User {
  private id: number;
  private socketId: string;

  constructor(connectionId: string) {
    this.socketId = connectionId;
    this.id = Math.floor((Math.random() * 10000) + 1);
  }

  getSocketId(): string{
    return this.socketId;
  }

}