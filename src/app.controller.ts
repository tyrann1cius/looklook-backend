import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PromotionService, UserService } from './app.service';
import { Promotion } from './interfaces/promotion.interface';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ExpressRequest } from './middlewares/auth.middleware';

@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get()
  getPromotion(): Promise<Promotion[]> {
    return this.promotionService.findAll();
  }

  @Post()
  setPromotion(@Body() promotion: CreatePromotionDto) {
    return this.promotionService.create(promotion);
  }

  @Put(':id')
  updatePromotion(@Param('id') id: string, @Body() promotion: any) {
    return this.promotionService.update(id, promotion);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotionService.delete(id);
  }
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    // return this.userService.createUser(createUserDto);
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // return this.userService.loginUser(loginDto);
    const user = await this.userService.loginUser(loginDto);
    return this.userService.buildUserResponse(user);
  }

  @Get()
  currentUser(@Request() request: ExpressRequest) {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.userService.buildUserResponse(request.user);
  }
}
