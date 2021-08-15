import { IJob } from 'src/jobs/interfaces/job.interface';

export const jobStub = (): IJob => {
  return {
    title: 'FullStack Javascript Developer',
    salary: 10000,
  };
};
