import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { PromotionService, UserService } from './app.service';
import { Promotion } from './interfaces/promotion.interface';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth/auth.guard';
import { UserData } from './interfaces/userdata.decorator';
import { UserEntity } from './interfaces/users.entity';

@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionService: PromotionService) {}

  // @UseGuards(AuthGuard)
  @Get()
  getPromotion(): Promise<Promotion[]> {
    return this.promotionService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('available')
  getAvailablePromotion(@UserData() user: UserEntity) {
    return this.promotionService.findAvailablePromotion(user);
  }

  @UseGuards(AuthGuard)
  @Get('redeemed')
  getRedeemedPromotion(@UserData() user: UserEntity) {
    return this.promotionService.findRedeemedPromotion(user);
  }

  @UseGuards(AuthGuard)
  @Post()
  setPromotion(@Body() promotion: CreatePromotionDto) {
    return this.promotionService.create(promotion);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updatePromotion(@Param('id') id: string, @Body() promotion: any) {
    return this.promotionService.update(id, promotion);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotionService.delete(id);
  }
}

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.loginUser(loginDto);
    return this.userService.buildUserResponse(user);
  }

  @UseGuards(AuthGuard)
  @Post('users/redeem/:id')
  async redeem(@UserData() user: UserEntity, @Param('id') id: string) {
    return this.userService.redeemPromotion(user, id);
  }
}
