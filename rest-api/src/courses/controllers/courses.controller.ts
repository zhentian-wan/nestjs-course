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
import { HttpExceptionFilter } from '../../filters/http-exception.filter';

@Controller('courses')
@UseFilters(new HttpExceptionFilter())
export class CoursesController {
  constructor(private couresDB: CoursesRepository) {}

  @Post()
  async createCourse(@Body() course: Partial<Course>): Promise<Course> {
    return this.couresDB.addCourse(course);
  }

  @Get()
  async findAllCourses(): Promise<Course[]> {
    return this.couresDB.findAll();
  }

  @Put(':courseId')
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body() changes: Partial<Course>,
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
