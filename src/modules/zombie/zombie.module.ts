import { Module } from '@nestjs/common';
import { ZombieResolver } from './zombie.resolver';
import { ZombieService } from './zombie.service';

@Module({
  controllers: [],
  providers: [ZombieService, ZombieResolver],
})
export class ZombieModule {}
