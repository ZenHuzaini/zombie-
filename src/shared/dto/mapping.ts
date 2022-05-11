import { testUser } from 'src/constants/user';
import { UserDTO } from 'src/modules/user/user.dto';
import { ListItem } from '../entity/listItem.entity';
import { ListItemDTO } from './listItem.dto';
import { v4 as uuid } from 'uuid';

export function mapToDto<Entity extends ListItem, DTO extends ListItemDTO>(
  entity: Entity,
): DTO {
  if (!entity) {
    return null;
  }
  if (entity.author) {
    delete entity.author;
  }
  if (entity.editor) {
    delete entity.editor;
  }
  const dto = {
    ...entity,
  } as unknown as DTO;
  return dto;
}

export function setCreatedAndModifiedFields(
  user: UserDTO = testUser,
): Pick<ListItem, 'Created' | 'Modified' | 'AuthorID' | 'EditorID' | 'GUID'> {
  const now = new Date();
  return {
    Created: now,
    Modified: now,
    AuthorID: user._id,
    EditorID: user._id,
    GUID: uuid(),
  };
}
