import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JobsService } from './jobs.service';
import { JobDto } from './dtos/job.dto';
import { IJob } from './interfaces/job.interface';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('jobs')
@Controller('jobs')
@UseFilters(HttpExceptionFilter)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ApiOkResponse({ description: 'A list of all jobs' })
  async findAll(): Promise<IJob[]> {
    return await this.jobsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'A job with specific ID' })
  @ApiNotFoundResponse({ description: 'Job not found' })
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
  @ApiCreatedResponse({ description: 'Job successfully created' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body(new ValidationPipe()) job: JobDto): Promise<IJob> {
    return this.jobsService.create(job);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Job updated successfuly' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) job: JobDto,
  ): Promise<void> {
    try {
      return await this.jobsService.update(id, job);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Job deleted successfuly' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return await this.jobsService.delete(id);
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
