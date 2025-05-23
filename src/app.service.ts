import { compare } from 'bcrypt';
import { sign, decode } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { Promotion } from './interfaces/promotion.interface';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { LoginDto } from './dto/login.dto';
import { UserResponseType } from './types/user-response.type';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './interfaces/users.entity';

@Injectable()
export class PromotionService {
  constructor(
    @Inject('PROMOTION_MODEL')
    private promotionModel: Model<Promotion>,
  ) {}

  async create(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    const createdPromotion = new this.promotionModel(createPromotionDto);
    return createdPromotion.save();
  }

  async findAll(): Promise<Promotion[]> {
    return this.promotionModel.find().exec();
  }

  async findAvailablePromotion(user: UserEntity) {
    return this.promotionModel
      .find({ isActive: true, redeemedUsers: { $ne: user.email } })
      .exec();
  }

  async findRedeemedPromotion(user: UserEntity) {
    return this.promotionModel
      .find({ isActive: true, redeemedUsers: user.email })
      .exec();
  }

  async update(id: string, updatePromotionDto: any) {
    return this.promotionModel
      .findOneAndUpdate({ promoId: id }, updatePromotionDto)
      .exec();
  }

  async delete(id: string) {
    return this.promotionModel.findOneAndDelete({ promoId: id }).exec();
  }
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private userModel: Model<UserEntity>,
    @Inject('PROMOTION_MODEL')
    private promotionModel: Model<Promotion>,
  ) {}

  async validateUser(token) {
    return this.decodeJwt(token);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userModel.findOne({ email: createUserDto.email });

    if (user) {
      throw new HttpException(
        'Email is already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async loginUser(loginDto: LoginDto): Promise<UserEntity> {
    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .select('+password');

    if (!user) {
      throw new HttpException(
        'User not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(loginDto.password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Incorrect password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return user;
  }

  async redeemPromotion(user: UserEntity, id: string) {
    return this.promotionModel
      .updateOne(
        { promoId: id },
        {
          $push: {
            redeemedUsers: user.email,
          },
        },
      )
      .exec();
  }

  buildUserResponse(userEntity: UserEntity): UserResponseType {
    return {
      username: userEntity.username,
      email: userEntity.email,
      token: this.generateJwt(userEntity),
    };
  }

  generateJwt(userEntity: UserEntity): string {
    return sign({ email: userEntity.email }, 'JWT_SECRET');
  }

  decodeJwt(jwtToken: string) {
    return decode(jwtToken);
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
