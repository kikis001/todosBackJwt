import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../entities/task.entity';
import { Model, Types } from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  get(id: string) {
    return this.taskModel.find({userId: id}).exec()
  }

  create(data: CreateTaskDto, id: string) {
    const newTask = new this.taskModel({
      ...data,
      userId: id
    });
    return newTask.save()
  }

  update(id: string, changes: UpdateTaskDto) {
    const tasks = this.taskModel.findByIdAndUpdate(id, { $set: changes}, { new: true }).exec();
    if(!tasks) {
      throw new NotFoundException("Tarea no encontrada");
    }
    return tasks;
  }

  delete(id: string) {
    const tasks = this.taskModel.findByIdAndDelete(id);
  }
}
