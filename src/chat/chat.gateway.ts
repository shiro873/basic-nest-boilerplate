import { WebSocketGateway, SubscribeMessage, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true }) // Enables CORS for WebSocket connections
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: { senderId: string; receiverId: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    const savedMessage = await this.chatService.saveMessage(data.senderId, data.receiverId, data.message);

    // Emit the message to both sender and receiver
    this.server.to(data.senderId).emit('receiveMessage', savedMessage);
    this.server.to(data.receiverId).emit('receiveMessage', savedMessage);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody('userId') userId: string, @ConnectedSocket() client: Socket) {
    client.join(userId); // Join a room based on user ID
  }
}
