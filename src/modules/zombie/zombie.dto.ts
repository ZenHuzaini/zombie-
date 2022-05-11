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
import { ZombieCategoryType } from './zombie.types';

@ObjectType()
export class ZombieDTOBase {
  @Field({ nullable: true })
  public id: string; //This is something that will be shown to the public

  @Field()
  public name: string;

  @Field({ nullable: true })
  public gender: ZombieCategoryType;

  @Field({ nullable: true })
  public dateCreated: Date; //Mongo has provided a createdAt column, but this is something that will be shown to public
}

@ObjectType()
export class ZombieDTO extends IntersectionType(
  ZombieDTOBase,
  ListItemDTO,
  ObjectType,
) {}

@InputType()
export class CreateZombieInputDTO extends IntersectionType(
  OmitType(ZombieDTO, ['dateCreated']), //Exclude date Created from creation to avoid redudancy
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
