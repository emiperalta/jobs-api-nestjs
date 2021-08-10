import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { JobsService } from './jobs.service';
import { JobDto } from './dtos/job.dto';
import { IJob } from './interfaces/job.interface';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  findAll(): Promise<IJob[]> {
    return this.jobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IJob> {
    return this.jobsService.findOne(id);
  }

  @Post()
  create(@Body() job: JobDto): Promise<IJob> {
    return this.jobsService.create(job);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() job: JobDto): Promise<IJob> {
    return this.jobsService.update(id, job);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<IJob> {
    return this.jobsService.delete(id);
  }
}
