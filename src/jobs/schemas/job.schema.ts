import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Job {
  @Prop()
  title: string;

  @Prop()
  salary: number;
}

export const JobSchema = SchemaFactory.createForClass(Job);
