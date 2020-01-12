import { Injectable } from '@nestjs/common';
import { Course } from '../../../../shared/course';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CoursesRepository {
  constructor(@InjectModel('Course') private courseModel: Model<Course>) {}

  async addCourse(course: Partial<Course>): Promise<Course> {
    // Create a memory version
    const newCourse = this.courseModel(course);
    // save to db
    await newCourse.save();
    // return the FE version data
    return newCourse.toObject({
      version: false, // without any mongoose props
    });
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find();
  }

  async updateCourse(id: string, changes: Partial<Course>): Promise<Course> {
    return this.courseModel.findOneAndUpdate(
      { _id: id },
      changes,
      { new: true }, // return a new version of the data
    );
  }

  async deleteCourse(id: string) {
    return this.courseModel.deleteOne({ _id: id });
  }
}
