import { Module } from '@nestjs/common';
import { PromotionsController, UserController } from './app.controller';
import { PromotionService, UserService } from './app.service';
import { appProviders } from './app.provider';
import { DatabaseModule } from './database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserEntitySchema } from './interfaces/users.entity';

@Module({
  imports: [
    UserEntity,
    DatabaseModule,
    MongooseModule.forRoot('mongodb://localhost/app'),
    MongooseModule.forFeature([{name: UserEntity.name, schema: UserEntitySchema}])
  ],
  controllers: [UserController, PromotionsController],
  providers: [UserService, PromotionService, ...appProviders],
})
export class AppModule {}
