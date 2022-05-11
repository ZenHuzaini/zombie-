import { Module } from '@nestjs/common';
import { ZombieController } from './zombie.controller';
import { ZombieService } from './zombie.service';

@Module({
  controllers: [ZombieController],
  providers: [ZombieService]
})
export class ZombieModule {}
