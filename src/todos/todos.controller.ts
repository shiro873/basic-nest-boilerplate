import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Post()
    async create(@Body('title') title: string) {
        return this.todosService.create(title);
    }

    @Get()
    async findAll() {
        return this.todosService.findAll();
    }
}
