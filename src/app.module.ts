import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [RestaurantModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
