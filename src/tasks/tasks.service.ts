import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(userId: number) {
    return this.tasksRepository.find({ where: { user_id: userId } });
  }

  async findOne(id: number, userId: number) {
    const task = await this.tasksRepository.findOne({
      where: { id, user_id: userId },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async create(dto: CreateTaskDto, userId: number) {
    const task = this.tasksRepository.create({ ...dto, user_id: userId });
    return this.tasksRepository.save(task);
  }

  async update(id: number, dto: UpdateTaskDto, userId: number) {
    const task = await this.findOne(id, userId); // throws 404 if not found/not owned
    Object.assign(task, dto);
    return this.tasksRepository.save(task);
  }

  async remove(id: number, userId: number) {
    const task = await this.findOne(id, userId);
    await this.tasksRepository.remove(task);
    return { message: 'Task deleted successfully' };
  }
}