import { IsString, IsInt } from 'class-validator';

export class JobDto {
  /**
   * The job title
   * @example "C++ Developer"
   */
  @IsString()
  readonly title: string;

  /**
   * The job salary
   * @example 5000
   */
  @IsInt()
  readonly salary: number;
}
