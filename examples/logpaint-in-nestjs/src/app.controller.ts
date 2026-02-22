import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHome() {
    return { message: 'Welcome to logpaint NestJS example!' };
  }

  @Get('users')
  getUsers() {
    return this.appService.findAllUsers();
  }

  @Get('users/:id')
  getUser(@Param('id') id: string) {
    return this.appService.findUserById(id);
  }

  @Post('users')
  createUser(@Body() body: { name: string }) {
    return this.appService.createUser(body.name);
  }

  @Get('health')
  getHealth() {
    return this.appService.checkHealth();
  }
}
