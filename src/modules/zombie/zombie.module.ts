import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zombie } from './zombie.entity';
import { ZombieResolver } from './zombie.resolver';
import { ZombieService } from './zombie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Zombie])],
  controllers: [],
  providers: [ZombieService, ZombieResolver],
})
export class ZombieModule {}
