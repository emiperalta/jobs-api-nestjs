import { Test } from '@nestjs/testing';
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
        expect(jobsService.findAll).toBeCalledTimes(1);
      });

      test('then it should return an array of jobs', () => {
        expect(jobs).toEqual([jobStub(), jobStub()]);
      });
    });
  });
});
