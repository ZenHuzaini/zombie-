import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mapToDto, setCreatedAndModifiedFields } from 'src/shared/dto/mapping';
import { PaginationDTO } from 'src/shared/dto/pagination.dto';
import { getPaginationOptions } from 'src/utils/resolver/getPaginationOptions';
import { FindConditions, Repository } from 'typeorm';
import {
  CreateZombieInputDTO,
  UpdateZombieInputDTO,
  ZombieDTO,
  ZombiesPagedResultDTO,
} from './zombie.dto';
import { Zombie } from './zombie.entity';
import { ObjectId } from 'mongodb';

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

    return mapToDto<Zombie, ZombieDTO>(saveData);
  }

  async updateZombie(
    zombieDTO: UpdateZombieInputDTO,
    id: string,
  ): Promise<ZombieDTO> {
    const update = await this.zombieRepository.update(id, zombieDTO);
    console.log('update ', update);
    return this.getZombieById(id);
  }

  async getZombieById(id: string): Promise<ZombieDTO> {
    const zombie = await this.zombieRepository.findOneOrFail({
      _id: new ObjectId(id),
    });
    return mapToDto<Zombie, ZombieDTO>(zombie);
  }

  async getAllZombies(
    paginationDTO: PaginationDTO,
  ): Promise<ZombiesPagedResultDTO> {
    const paginationOptions = getPaginationOptions(paginationDTO);
    const [zombies, count] = await this.zombieRepository.findAndCount({
      skip: paginationOptions.startIndex,
      take: paginationOptions.itemCount,
    });
    const records = zombies.map((item) => mapToDto<Zombie, ZombieDTO>(item));

    return {
      count,
      records,
    };
  }
}
