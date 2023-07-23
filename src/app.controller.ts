import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/')
  @Render('index')
  @Get('/chat')
  @Render('index')
  Home() {
    return { message: 'Hello world!' };
  }
}
