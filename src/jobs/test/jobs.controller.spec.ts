import { Test } from '@nestjs/testing';
import { JobDto } from '../dtos/job.dto';
import { IJob } from '../interfaces/job.interface';

import { JobsController } from '../jobs.controller';
import { JobsService } from '../jobs.service';
import { jobStub } from './stubs/job.stub';

jest.mock('../jobs.service');

describe('JobsController', () => {
  let jobsController: JobsController;
  let jobsService: JobsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [JobsService],
    }).compile();

    jobsController = moduleRef.get<JobsController>(JobsController);
    jobsService = moduleRef.get<JobsService>(JobsService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let jobs: IJob[];

      beforeEach(async () => {
        jobs = await jobsController.findAll();
      });

      test('then it should call jobsService once', () => {
        expect(jobsService.findAll).toHaveBeenCalled();
      });

      test('then it should return an array of jobs', () => {
        expect(jobs).toEqual([jobStub(), jobStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let job: IJob;

      beforeEach(async () => {
        job = await jobsService.findOne(jobStub().id);
      });

      test('then it should call jobsService', () => {
        expect(jobsService.findOne).toBeCalledWith(jobStub().id);
      });

      test('then it should return a job', () => {
        expect(job).toEqual(jobStub());
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let newJob: JobDto;

      beforeEach(async () => {
        newJob = await jobsService.create(jobStub());
      });

      test('then it should call jobsService', () => {
        expect(jobsService.create).toBeCalledWith(jobStub());
      });

      test('then it should create a new job', () => {
        expect(newJob).toEqual(jobStub());
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let jobToUpdate: JobDto;

      beforeEach(async () => {
        jobToUpdate = {
          title: 'CSharp Developer',
          salary: 4000,
        };
        await jobsService.update(jobStub().id, jobToUpdate);
      });

      test('then it should call jobsService', () => {
        expect(jobsService.update).toBeCalledWith(jobStub().id, jobToUpdate);
      });
    });
  });

  describe('delete', () => {
    describe('when delete is called', () => {
      beforeEach(async () => {
        await jobsService.delete(jobStub().id);
      });

      test('then it should call jobsService', () => {
        expect(jobsService.delete).toHaveBeenCalledWith(jobStub().id);
      });
    });
  });
});
