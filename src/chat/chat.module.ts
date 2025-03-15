import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatMessage, ChatMessageSchema } from './schemas/chat-message.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ChatMessage.name, schema: ChatMessageSchema }])],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
