import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Job } from './schemas/job.schema';
import { IJob } from './interfaces/job.interface';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<IJob>) {}

  async findAll(): Promise<IJob[]> {
    return await this.jobModel.find();
  }

  async findOne(id: string): Promise<IJob> {
    return await this.jobModel.findById(id);
  }

  async create(job: IJob): Promise<IJob> {
    const newJob = new this.jobModel(job);
    return await newJob.save();
  }

  async update(id: string, job: IJob): Promise<IJob> {
    return await this.jobModel.findByIdAndUpdate(id, job, { new: true });
  }

  async delete(id: string): Promise<IJob> {
    return await this.jobModel.findByIdAndDelete(id);
  }
}
