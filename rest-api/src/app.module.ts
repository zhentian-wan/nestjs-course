import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';

import { MONGODB_CONNECTION_URL } from './constants';

@Module({
  imports: [CoursesModule, MongooseModule.forRoot(MONGODB_CONNECTION_URL)],
})
export class AppModule {}
