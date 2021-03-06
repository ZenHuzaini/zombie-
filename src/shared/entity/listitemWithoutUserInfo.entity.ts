import { Index, Column, ObjectIdColumn } from 'typeorm';
import { ListResult } from '../interface/common';

export const LIST_ITEM_WITHOUT_USER_INFO_UNIQUE_FIELDS: (keyof ListItemWithoutUserInfo)[] =
  ['GUID'];

export class ListItemWithoutUserInfo
  implements Omit<ListResult<Date>, 'Author' | 'Editor'>
{
  @ObjectIdColumn()
  @Index()
  public _id: any; //TODO: should be typed. Type in mongodb driver is not available

  @Column('datetime', { default: null })
  public Created: Date;

  @Column('datetime', { default: null })
  public Modified: Date;

  @Column({ default: null })
  @Index()
  public GUID: string;
}
