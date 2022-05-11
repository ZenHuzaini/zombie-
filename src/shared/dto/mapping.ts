import { ListItem } from '../entity/listItem.entity';
import { ListItemDTO } from './listItem.dto';

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
  dto.id = entity.ID;
  return dto;
}
