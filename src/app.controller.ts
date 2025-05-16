import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Promotion } from './interfaces/promotion.interface';
import { CreatePromotionDto } from './dto/create-promotion.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('promotions')
export class PromotionsController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getPromotion(): Promise<Promotion[]> {
    return this.appService.findAll();
  }

  @Post()
  setPromotion(@Body() promotion: CreatePromotionDto) {
    return this.appService.create(promotion);
  }

  @Put(':id')
  updatePromotion(@Param('id') id: string, @Body() promotion: any) {
    return this.appService.update(id, promotion);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.delete(id);
  }
}
