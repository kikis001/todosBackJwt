import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request, UseGuards } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) {}

  @Get()
  get(@Request() req) {
    return this.tasksService.get(req.user.sub)
  }

  @Post()
  create(@Body() data: CreateTaskDto, @Request() req) {
    return this.tasksService.create(data, req.user.sub);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() changes: UpdateTaskDto) {
    return this.tasksService.update(id, changes);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
