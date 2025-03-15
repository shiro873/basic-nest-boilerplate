import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage } from './schemas/chat-message.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel(ChatMessage.name) private chatModel: Model<ChatMessage>) {}

  async saveMessage(senderId: string, receiverId: string, message: string): Promise<ChatMessage> {
    const chatMessage = new this.chatModel({ senderId, receiverId, message });
    return chatMessage.save();
  }

  async getMessagesBetweenUsers(user1: string, user2: string): Promise<ChatMessage[]> {
    return this.chatModel.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 },
      ],
    }).sort({ createdAt: 1 }).exec();
  }
}
