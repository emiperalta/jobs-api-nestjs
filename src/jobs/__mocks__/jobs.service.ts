import { jobStub } from '../test/stubs/job.stub';

export const JobsService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([jobStub(), jobStub()]),
  findOne: jest.fn().mockResolvedValue(jobStub()),
  create: jest.fn().mockResolvedValue(jobStub()),
  update: jest.fn().mockResolvedValue(null),
  delete: jest.fn().mockResolvedValue(null),
});
