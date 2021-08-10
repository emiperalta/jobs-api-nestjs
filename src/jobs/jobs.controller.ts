import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';

import { JobsService } from './jobs.service';
import { JobDto } from './dtos/job.dto';
import { IJob } from './interfaces/job.interface';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe';

@Controller('jobs')
@UseFilters(HttpExceptionFilter)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async findAll(): Promise<IJob[]> {
    return await this.jobsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IJob> {
    try {
      const job = await this.jobsService.findOne(id);
      if (!job) throw new NotFoundException();
      return job;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Post()
  create(@Body(new ValidationPipe()) job: JobDto): Promise<IJob> {
    return this.jobsService.create(job);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) job: JobDto,
  ): Promise<IJob> {
    return this.jobsService.update(id, job);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<IJob> {
    return this.jobsService.delete(id);
  }
}
