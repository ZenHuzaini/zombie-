import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZombieModule } from './modules/zombie/zombie.module';

@Module({
  imports: [ZombieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
