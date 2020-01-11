import { Controller, Get } from '@nestjs/common';
import { Course } from '../../../../shared/course';
import { findAllCourses } from '../../../db-data';
import { CoursesRepository } from '../repositories/courses.repository';

@Controller()
export class CoursesController {
  constructor(private couresDB: CoursesRepository) {}

  @Get('/api/courses')
  async findAllCourses(): Promise<Course[]> {
    return this.couresDB.findAll();
  }
}
