import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Delete,
  Post,
  BadRequestException,
  UseFilters,
} from '@nestjs/common';
import { Course } from '../../../../shared/course';
import { CoursesRepository } from '../repositories/courses.repository';

@Controller('courses')
export class CoursesController {
  constructor(private couresDB: CoursesRepository) {}

  @Post()
  async createCourse(@Body() course: Course): Promise<Course> {
    return this.couresDB.addCourse(course);
  }

  @Get()
  async findAllCourses(): Promise<Course[]> {
    return this.couresDB.findAll();
  }

  @Put(':courseId')
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body() changes: Course,
  ): Promise<Course> {
    if (changes._id) {
      throw new BadRequestException('Cannot update course id');
    }

    return this.couresDB.updateCourse(courseId, changes);
  }

  @Delete(':courseId')
  async deleteCourse(@Param('courseId') courseId: string) {
    return this.couresDB.deleteCourse(courseId);
  }
}
