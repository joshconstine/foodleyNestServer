import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);
    });
    // this.server.on('receive_message', (data) => {
    //   console.log(data + 'in server');
    // });
  }

  @SubscribeMessage('send_message')
  onNewMessage(@MessageBody() data: string) {
    console.log(data);
    this.server.emit('onMessege', {
      message: 'Received message',
      content: data,
    });
  }
}
