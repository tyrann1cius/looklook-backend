import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Promotion } from './interfaces/promotion.interface';
import { CreatePromotionDto } from './dto/create-promotion.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('PROMOTION_MODEL')
    private promotionModel: Model<Promotion>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async create(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    const createdPromotion = new this.promotionModel(createPromotionDto);
    return createdPromotion.save();
  }

  async findAll(): Promise<Promotion[]> {
    return this.promotionModel.find().exec();
  }

  async update(id: string, updatePromotionDto: any) {
    return this.promotionModel
      .findOneAndUpdate({ id: id }, updatePromotionDto)
      .exec();
  }

  async delete(id: string) {
    console.log(id);
    return this.promotionModel.findOneAndDelete({ id: id }).exec();
  }
}
