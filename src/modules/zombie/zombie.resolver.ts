import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationDTO } from 'src/shared/dto/pagination.dto';
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
    return {
      count: 2,
      records: [
        {
          name: 'aaa',
          gender: 'Kid',
          dateCreated: new Date(),
          AuthorID: 2,
          Created: new Date(),
          EditorID: 3,
          GUID: 'eeert',
          ID: 1,
          id_: '1',
          Modified: new Date(),
        },
        {
          name: 'test file',
          gender: 'Kid',
          dateCreated: new Date(),
          AuthorID: 2,
          Created: new Date(),
          EditorID: 3,
          GUID: 'eeert',
          ID: 1,
          id_: '1',
          Modified: new Date(),
        },
      ],
    };
  }
}
