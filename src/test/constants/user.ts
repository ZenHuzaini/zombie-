import {
  ZombieDTO,
  ZombiesPagedResultDTO,
} from 'src/modules/zombie/zombie.dto';

export const zombies: ZombieDTO[] = [
  {
    name: 'test',
    gender: 'Female',
    ageCategory: 'Kid',
    AuthorID: 'abcdef',
    Created: new Date(),
    EditorID: 'abcdef',
    GUID: 'eeert',
    _id: 'abcdef',
    Modified: new Date(),
  },
  {
    name: 'test 0',
    gender: 'Female',
    ageCategory: 'Adult',
    AuthorID: 'abcdeff',
    Created: new Date(),
    EditorID: 'abcdeff',
    GUID: 'abcdeff',
    _id: 'abcdeff',
    Modified: new Date(),
  },
  {
    name: 'test 1',
    gender: 'Male',
    ageCategory: 'Kid',
    AuthorID: 'abcdeff',
    Created: new Date(),
    EditorID: 'abcdeff',
    GUID: 'abcdeff',
    _id: 'abcdeff',
    Modified: new Date(),
  },
];

export const zombiesPagedResult: ZombiesPagedResultDTO = {
  count: zombies.length,
  records: zombies,
};
