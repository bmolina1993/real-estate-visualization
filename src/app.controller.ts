import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DataEstateInsertService } from './scraping/services/dataInsert.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataEstateService: DataEstateInsertService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('data')
  getAllData() {
    return this.dataEstateService.findAll();
  }
}
