import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard) // protects every route in this controller — replaces router.use(authMiddleware)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll(@Req() req) {
    return this.tasksService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.tasksService.findOne(+id, req.user.id);
  }

  @Post()
  create(@Body() dto: CreateTaskDto, @Req() req) {
    return this.tasksService.create(dto, req.user.id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto, @Req() req) {
    return this.tasksService.update(+id, dto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.tasksService.remove(+id, req.user.id);
  }
}