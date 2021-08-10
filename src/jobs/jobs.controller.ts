import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('jobs')
export class JobsController {
  @Get()
  findAll(): string {
    return 'findAll';
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return 'findOne';
  }

  @Post()
  create(): string {
    return 'create';
  }

  @Put(':id')
  update(@Param() params): string {
    console.log(params.id);
    return 'update';
  }

  @Delete(':id')
  delete(@Param() params): string {
    console.log(params.id);
    return 'delete';
  }
}
