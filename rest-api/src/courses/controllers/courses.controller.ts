import { Controller, Get } from '@nestjs/common';

@Controller()
export class CoursesController {
  @Get('/api/hello-wrold')
  async helloWorld() {
    return 'hello world!';
  }
}
