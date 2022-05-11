import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import {
  CreateListItemInputWithoutSystemFieldsDTO,
  ListItemDTO,
  UpdateListItemInputDTO,
} from '../../shared/dto/listItem.dto';
import { PagedResultDTO } from '../../shared/dto/pagedResult.dto';

@ObjectType()
class UserDTOBase {
  @Field()
  public email: string;

  @Field()
  public name: string;
}

@ObjectType()
export class UserDTO extends IntersectionType(
  UserDTOBase,
  ListItemDTO,
  ObjectType,
) {}

@InputType()
export class CreateMemberUserInputDTO extends IntersectionType(
  UserDTOBase,
  CreateListItemInputWithoutSystemFieldsDTO,
  InputType,
) {}

@InputType()
export class UpdateUserInputDTO extends IntersectionType(
  PartialType(
    PickType<UserDTOBase, 'name' | 'email'>(UserDTOBase, ['name', 'email']),
  ),
  UpdateListItemInputDTO,
  InputType,
) {}

@ObjectType()
export class UsersPagedResultDTO extends PagedResultDTO<UserDTO> {
  @Field(() => [UserDTO])
  public records: UserDTO[];
}
