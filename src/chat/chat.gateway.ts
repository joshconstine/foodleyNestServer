import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface Chat {
  id: number;
  email: string;
  text: string;

  createdAt: Date;
}

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);
    });
  }
  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: Chat): Promise<void> {
    this.server.emit('recMessege', payload);
  }
  @SubscribeMessage('isTyping')
  async handleSendIsTyping(client: Socket, payload: string): Promise<void> {
    this.server.emit('recIsTyping', payload);
  }

  afterInit(server: Server) {
    console.log(server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
  }
}
