import { Module } from '@nestjs/common';
import { AppController, PromotionsController } from './app.controller';
import { AppService } from './app.service';
import { appProviders } from './app.provider';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, PromotionsController],
  providers: [AppService, ...appProviders],
})
export class AppModule {}
