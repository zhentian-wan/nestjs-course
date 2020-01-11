import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './controllers/courses.controller';
import { CoursesSchema } from './schemas/courses.schema';
import { CoursesRepository } from './repositories/courses.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Course',
        schema: CoursesSchema,
      },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesRepository],
})
export class CoursesModule {}
