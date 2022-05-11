import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginationDTO } from 'src/shared/dto/pagination.dto';
import { zombiesPagedResult } from 'src/test/constants/user';
import {
  CreateZombieInputDTO,
  ZombieDTO,
  ZombiesPagedResultDTO,
} from './zombie.dto';
import { ZombieService } from './zombie.service';

@Resolver(() => ZombieDTO)
export class ZombieResolver {
  constructor(private readonly zombieService: ZombieService) {}
  @Query(() => ZombiesPagedResultDTO)
  public async zombies(
    @Args({
      name: 'pagination',
      type: () => PaginationDTO,
      nullable: true,
    })
    paginationDTO: PaginationDTO,
  ): Promise<ZombiesPagedResultDTO> {
    return zombiesPagedResult;
  }

  @Mutation(() => ZombieDTO)
  createLesson(
    @Args({ name: 'zombie', type: () => CreateZombieInputDTO })
    zombie: CreateZombieInputDTO,
  ) {
    //call service
    return this.zombieService.createZombie(zombie);
  }
}
