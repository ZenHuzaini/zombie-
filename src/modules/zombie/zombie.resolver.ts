import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PaginationDTO } from 'src/shared/dto/pagination.dto';
import { ItemDTO, TotalItemPriceDTO } from '../item/item.dto';
import { ItemService } from '../item/item.service';
import {
  CreateZombieInputDTO,
  UpdateZombieInputDTO,
  ZombieDTO,
  ZombiesPagedResultDTO,
} from './zombie.dto';
import { ZombieService } from './zombie.service';

@Resolver(() => ZombieDTO)
export class ZombieResolver {
  constructor(
    private readonly zombieService: ZombieService,
    private readonly itemService: ItemService,
  ) {}
  @Query(() => ZombiesPagedResultDTO)
  public async zombies(
    @Args({
      name: 'pagination',
      type: () => PaginationDTO,
      nullable: true,
    })
    paginationDTO: PaginationDTO,
  ): Promise<ZombiesPagedResultDTO> {
    return this.zombieService.getAllZombies(paginationDTO);
  }

  @Query(() => ZombieDTO)
  public async zombie(@Args('id') id: string): Promise<ZombieDTO> {
    return this.zombieService.getZombieById(id);
  }

  @Mutation(() => ZombieDTO)
  createZombie(
    @Args({ name: 'zombie', type: () => CreateZombieInputDTO })
    zombie: CreateZombieInputDTO,
  ) {
    return this.zombieService.createZombie(zombie);
  }

  @Mutation(() => ZombieDTO)
  updateZombie(
    @Args({ name: 'zombie', type: () => UpdateZombieInputDTO })
    zombie: UpdateZombieInputDTO,
    @Args('id') id: string,
  ) {
    return this.zombieService.updateZombie(zombie, id);
  }

  @ResolveField('items', () => [ItemDTO])
  public async items(@Parent() zombie: ZombieDTO): Promise<ItemDTO[]> {
    return this.itemService.getItemsByZombieId(zombie._id);
  }

  @ResolveField('totalItemPrice', () => TotalItemPriceDTO)
  public async totalItemPrice(
    @Parent() zombie: ZombieDTO,
  ): Promise<TotalItemPriceDTO> {
    return this.itemService.getTotalItemPrice(zombie._id);
  }
}
