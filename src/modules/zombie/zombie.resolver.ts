import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationDTO } from 'src/shared/dto/pagination.dto';
import { zombiesPagedResult } from 'src/test/constants/user';
import { ZombieDTO, ZombiesPagedResultDTO } from './zombie.dto';

@Resolver(() => ZombieDTO)
export class ZombieResolver {
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
}
