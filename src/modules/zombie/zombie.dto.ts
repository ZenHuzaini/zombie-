import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PickType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import {
  CreateListItemInputWithoutSystemFieldsDTO,
  ListItemDTO,
  UpdateListItemInputDTO,
} from 'src/shared/dto/listItem.dto';
import { PagedResultDTO } from 'src/shared/dto/pagedResult.dto';
import { ZombieCategoryType, ZombieGenderType } from './zombie.types';

@ObjectType()
export class ZombieDTOBase {
  @Field()
  public name: string;

  @Field({ nullable: true })
  public gender: ZombieGenderType;

  @Field({ nullable: true })
  public ageCategory: ZombieCategoryType;
}

@ObjectType()
export class ZombieDTO extends IntersectionType(
  ZombieDTOBase,
  ListItemDTO,
  ObjectType,
) {}

@InputType()
export class CreateZombieInputDTO extends IntersectionType(
  ZombieDTO,
  CreateListItemInputWithoutSystemFieldsDTO,
  InputType,
) {}

@InputType()
export class UpdateZombieInputDTO extends IntersectionType(
  PartialType(
    PickType<ZombieDTOBase, 'name' | 'gender'>(ZombieDTOBase, [
      'name',
      'gender',
    ]),
  ),
  UpdateListItemInputDTO,
  InputType,
) {}

@ObjectType()
export class ZombiesPagedResultDTO extends PagedResultDTO<ZombieDTO> {
  @Field(() => [ZombieDTO])
  public records: ZombieDTO[];
}
