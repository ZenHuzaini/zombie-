import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PickType,
  PartialType,
  Int,
} from '@nestjs/graphql';
import {
  CreateListItemInputWithoutSystemFieldsDTO,
  ListItemDTO,
  UpdateListItemInputDTO,
} from 'src/shared/dto/listItem.dto';
import { PagedResultDTO } from 'src/shared/dto/pagedResult.dto';

@ObjectType()
export class ItemDTOBase {
  @Field()
  public zombieId: string;

  @Field()
  public name: string;

  @Field(() => Int)
  public price: number;
}

@ObjectType()
export class ItemDTO extends IntersectionType(
  ItemDTOBase,
  ListItemDTO,
  ObjectType,
) {}

@InputType()
export class CreateItemInputDTO extends IntersectionType(
  ItemDTO,
  CreateListItemInputWithoutSystemFieldsDTO,
  InputType,
) {}

@InputType()
export class UpdateItemInputDTO extends IntersectionType(
  PartialType(
    PickType<ItemDTOBase, 'name' | 'price'>(ItemDTOBase, ['name', 'price']),
  ),
  UpdateListItemInputDTO,
  InputType,
) {}

@ObjectType()
export class ItemsPagedResultDTO extends PagedResultDTO<ItemDTO> {
  @Field(() => [ItemDTO])
  public records: ItemDTO[];
}
