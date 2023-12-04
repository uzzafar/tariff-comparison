import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/tariffs')
  getTariffs() {
    return this.appService.getTariffs();
  }

  @Post('/calculate-tariffs')
  calculateTariffs(@Body() reqBody: { consumption: number }) {
    try {
      return this.appService.calculateTariffs(reqBody.consumption);
    } catch (error) {
      console.error(error.message);
      throw new HttpException('Invalid request data', HttpStatus.BAD_REQUEST);
    }
  }
}
