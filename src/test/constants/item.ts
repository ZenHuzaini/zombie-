import { ItemDTO, ItemsPagedResultDTO } from 'src/modules/item/item.dto';

export const items: ItemDTO[] = [
  {
    name: 'test',
    price: 100,
    AuthorID: 'abcdef',
    Created: new Date(),
    EditorID: 'abcdef',
    GUID: 'eeert',
    _id: 'abcdef',
    Modified: new Date(),
  },
  {
    name: 'test 0',
    price: 20,
    AuthorID: 'abcdeff',
    Created: new Date(),
    EditorID: 'abcdeff',
    GUID: 'abcdeff',
    _id: 'abcdeff',
    Modified: new Date(),
  },
  {
    name: 'test 1',
    price: 5,
    AuthorID: 'abcdeff',
    Created: new Date(),
    EditorID: 'abcdeff',
    GUID: 'abcdeff',
    _id: 'abcdeff',
    Modified: new Date(),
  },
];

export const itemsPagedResult: ItemsPagedResultDTO = {
  count: items.length,
  records: items,
};
