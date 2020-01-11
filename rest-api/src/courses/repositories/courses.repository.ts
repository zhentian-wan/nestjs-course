import { Injectable } from '@nestjs/common';
import { Course } from '../../../../shared/course';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CoursesRepository {
  constructor(@InjectModel('Course') private courseModel: Model<Course>) {}

  async findAll(): Promise<Course[]> {
    return this.courseModel.find();
  }
}
