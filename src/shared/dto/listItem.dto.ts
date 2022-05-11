import {
  Field,
  Int,
  ObjectType,
  OmitType,
  InputType,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { ListResult } from '../interface/common';

@ObjectType()
export class ListItemWithoutUserInfoDTO implements ListResult<Date> {
  /**
   * Used by the Apollo Client as a key for caching
   */
  @Field(() => Int)
  public id?: number;

  @Field(() => Int)
  public ID: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  public Created: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  public Modified: Date;

  @Field()
  public GUID: string;
}

@ObjectType()
export class ListItemDTO extends ListItemWithoutUserInfoDTO {
  @Field(() => Int, { nullable: true })
  public AuthorID: number;

  @Field(() => Int, { nullable: true })
  public EditorID: number;
}

@InputType()
export class CreateListItemInputDTO extends OmitType<
  ListItemDTO,
  'id' | 'ID' | 'GUID'
>(ListItemDTO, ['id', 'ID', 'GUID'], InputType) {
  @Field(() => Int, { nullable: true })
  public ID: number;

  @Field({ nullable: true })
  public GUID: string;
}

@InputType()
export class CreateListItemInputWithoutSystemFieldsDTO extends OmitType<
  ListItemDTO,
  'id' | 'ID' | 'GUID' | 'Created' | 'Modified' | 'AuthorID' | 'EditorID'
>(
  ListItemDTO,
  ['id', 'ID', 'GUID', 'Created', 'Modified', 'AuthorID', 'EditorID'],
  InputType,
) {}

@InputType()
export class UpdateListItemInputDTO extends OmitType<
  ListItemDTO,
  'id' | 'ID' | 'GUID' | 'Modified' | 'Created' | 'AuthorID' | 'EditorID'
>(
  ListItemDTO,
  ['id', 'ID', 'GUID', 'Modified', 'Created', 'AuthorID', 'EditorID'],
  InputType,
) {}
