import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from '../item/item.module';
import { Zombie } from './zombie.entity';
import { ZombieResolver } from './zombie.resolver';
import { ZombieService } from './zombie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Zombie]), forwardRef(() => ItemModule)],
  controllers: [],
  providers: [ZombieService, ZombieResolver],
})
export class ZombieModule {}
