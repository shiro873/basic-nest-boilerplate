import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Todo, TodoSchema } from './schema/todo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]) // ✅ Register Todo model
  ],
  providers: [TodosService],
  controllers: [TodosController],
  exports: [TodosService], // ✅ Export if needed elsewhere
})
export class TodosModule {}
