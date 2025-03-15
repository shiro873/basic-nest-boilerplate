import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './schema/todo.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {} // ✅ Correct Injection

  async create(title: string): Promise<Todo> {
    const todo = new this.todoModel({ title });
    return todo.save();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }
}
