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

export interface ExternalItemApiResponse {
  timestamp: number;
  items: Partial<ExternalItemDTO[]>;
}

export interface ExternalRateApiResponse {
  currency: string;
  code: string;
  bid: number;
  ask: number;
}

@ObjectType()
export class ItemDTOBase {
  @Field({ nullable: true })
  public zombieId: string;

  @Field()
  public name: string;

  @Field(() => Int)
  public price: number;
}

@ObjectType()
export class ExternalItemDTO extends ItemDTOBase {
  @Field(() => Int)
  public id: number;
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

@ObjectType()
export class ExternalItemsPagedResultDTO extends PagedResultDTO<ExternalItemDTO> {
  @Field(() => [ExternalItemDTO])
  public records: Partial<ExternalItemDTO[]>;
}

@ObjectType()
export class TotalItemPriceDTO {
  @Field(() => Int, { nullable: true })
  public PLN: number;

  @Field(() => Int, { nullable: true })
  public EU: number;

  @Field(() => Int, { nullable: true })
  public USD: number;
}
