import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeletedItemDTO } from 'src/shared/dto/listItem.dto';
import { PaginationDTO } from 'src/shared/dto/pagination.dto';
import {
  CreateItemInputDTO,
  ExternalItemsPagedResultDTO,
  ItemDTO,
  ItemsPagedResultDTO,
} from './item.dto';
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

  //Not Buy Item
  @Mutation(() => ItemDTO)
  createItem(
    @Args({ name: 'Item', type: () => CreateItemInputDTO })
    Item: CreateItemInputDTO,
  ) {
    return this.itemService.createItem(Item);
  }

  @Query(() => ExternalItemsPagedResultDTO)
  public async externalItems(): Promise<ExternalItemsPagedResultDTO> {
    return this.itemService.getExternalItems();
  }

  @Mutation(() => ItemDTO)
  buyExternalItem(
    @Args({ name: 'zombieId', type: () => String })
    zombieId: string,

    @Args({ name: 'itemId', type: () => Int })
    itemId: number,
  ) {
    return this.itemService.buyItem(zombieId, itemId);
  }

  @Mutation(() => DeletedItemDTO)
  public async deleteZombieItem(
    @Args('zombieId') zombieId: string,
    @Args('itemId') itemId: string,
  ): Promise<DeletedItemDTO> {
    const a = await this.itemService.deleteZombieItem(zombieId, itemId);
    return { _id: zombieId };
  }
}
