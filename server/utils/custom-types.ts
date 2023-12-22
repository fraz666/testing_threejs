import { Request } from 'express';
import { Server } from 'socket.io';

export type AppRequest = Request & NonNullable<{ io: Server }>;