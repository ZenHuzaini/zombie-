import {
  ZombieDTO,
  ZombiesPagedResultDTO,
} from 'src/modules/zombie/zombie.dto';

export const zombies: ZombieDTO[] = [
  {
    name: 'SOmething',
    gender: 'Female',
    ageCategory: 'Kid',
    dateCreated: new Date(),
    AuthorID: 2,
    Created: new Date(),
    EditorID: 3,
    GUID: 'eeert',
    ID: 1,
    id_: '1',
    Modified: new Date(),
  },
  {
    name: 'test file',
    gender: 'Female',
    ageCategory: 'Adult',
    dateCreated: new Date(),
    AuthorID: 2,
    Created: new Date(),
    EditorID: 3,
    GUID: 'eeert',
    ID: 1,
    id_: '1',
    Modified: new Date(),
  },
  {
    name: 'test 1',
    gender: 'Male',
    ageCategory: 'Kid',
    dateCreated: new Date(),
    AuthorID: 2,
    Created: new Date(),
    EditorID: 3,
    GUID: 'eeert',
    ID: 1,
    id_: '1',
    Modified: new Date(),
  },
];

export const zombiesPagedResult: ZombiesPagedResultDTO = {
  count: zombies.length,
  records: zombies,
};
