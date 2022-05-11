import { PrimaryGeneratedColumn, Index, Column } from 'typeorm';
import { ListResult } from '../interface/common';

export const LIST_ITEM_WITHOUT_USER_INFO_UNIQUE_FIELDS: (keyof ListItemWithoutUserInfo)[] =
  ['GUID'];

export class ListItemWithoutUserInfo
  implements Omit<ListResult<Date>, 'Author' | 'Editor'>
{
  @PrimaryGeneratedColumn()
  @Index()
  public ID: number;

  @Column('datetime')
  public Created: Date;

  @Column('datetime')
  public Modified: Date;

  @Column()
  @Index()
  public GUID: string;
}
