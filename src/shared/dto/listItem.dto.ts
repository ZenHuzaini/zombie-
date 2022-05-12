import {
  Field,
  ObjectType,
  OmitType,
  InputType,
  GraphQLISODateTime,
  PickType,
} from '@nestjs/graphql';
import { ListResult } from '../interface/common';

@ObjectType()
export class ListItemWithoutUserInfoDTO implements ListResult<Date> {
  @Field({ nullable: true })
  public _id: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  public Created: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  public Modified: Date;

  @Field({ nullable: true })
  public GUID: string;
}

@ObjectType()
export class ListItemDTO extends ListItemWithoutUserInfoDTO {
  @Field({ nullable: true })
  public AuthorID: string;

  @Field({ nullable: true })
  public EditorID: string;
}

@InputType()
export class CreateListItemInputDTO extends OmitType<
  ListItemDTO,
  '_id' | 'GUID'
>(ListItemDTO, ['_id', 'GUID'], InputType) {
  @Field({ nullable: true })
  public _id: string;

  @Field({ nullable: true })
  public GUID: string;
}

@InputType()
export class CreateListItemInputWithoutSystemFieldsDTO extends OmitType<
  ListItemDTO,
  '_id' | 'GUID' | 'Created' | 'Modified' | 'AuthorID' | 'EditorID'
>(
  ListItemDTO,
  ['_id', 'GUID', 'Created', 'Modified', 'AuthorID', 'EditorID'],
  InputType,
) {}

@InputType()
export class UpdateListItemInputDTO extends OmitType<
  ListItemDTO,
  '_id' | 'GUID' | 'Modified' | 'Created' | 'AuthorID' | 'EditorID'
>(
  ListItemDTO,
  ['_id', 'GUID', 'Modified', 'Created', 'AuthorID', 'EditorID'],
  InputType,
) {}

@ObjectType()
export class DeletedItemDTO extends PickType<ListItemDTO, '_id'>(
  ListItemDTO,
  ['_id'],
  ObjectType,
) {}
