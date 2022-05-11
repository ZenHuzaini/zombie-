import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginationDTO } from 'src/shared/dto/pagination.dto';
import { itemsPagedResult } from 'src/test/constants/item';
import { CreateItemInputDTO, ItemDTO, ItemsPagedResultDTO } from './item.dto';
import { ItemService } from './item.service';

@Resolver(() => ItemDTO)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}
  @Query(() => ItemsPagedResultDTO)
  public async items(
    @Args({
      name: 'pagination',
      type: () => PaginationDTO,
      nullable: true,
    })
    paginationDTO: PaginationDTO,
  ): Promise<ItemsPagedResultDTO> {
    return this.itemService.getAllItems(paginationDTO);
  }

  @Mutation(() => ItemDTO)
  createItem(
    @Args({ name: 'Item', type: () => CreateItemInputDTO })
    Item: CreateItemInputDTO,
  ) {
    return this.itemService.createItem(Item);
  }
}
