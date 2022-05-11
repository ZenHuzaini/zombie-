import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mapToDto, setCreatedAndModifiedFields } from 'src/shared/dto/mapping';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateZombieInputDTO, ZombieDTO } from './zombie.dto';
import { Zombie } from './zombie.entity';

@Injectable()
export class ZombieService {
  constructor(
    @InjectRepository(Zombie)
    private zombieRepository: Repository<Zombie>,
  ) {}

  async createZombie(zombieDTO: CreateZombieInputDTO): Promise<ZombieDTO> {
    const { gender, ageCategory, name } = zombieDTO;

    const saveData = await this.zombieRepository.save({
      ...setCreatedAndModifiedFields(),
      ageCategory,
      gender,
      name,
    });

    const zombie = mapToDto<Zombie, ZombieDTO>(saveData);
    console.log('get zombieee ', zombie);

    return zombie;
  }
}
