import { User } from 'src/modules/user/user.entity';
import { Column, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ListResult } from '../interface/common';
import {
  ListItemWithoutUserInfo,
  LIST_ITEM_WITHOUT_USER_INFO_UNIQUE_FIELDS,
} from './listitemWithoutUserInfo.entity';

export const LIST_ITEM_UNIQUE_FIELDS: (keyof ListItemWithoutUserInfo)[] =
  LIST_ITEM_WITHOUT_USER_INFO_UNIQUE_FIELDS;

export class ListItem
  extends ListItemWithoutUserInfo
  implements Omit<ListResult<Date>, 'Author' | 'Editor'>
{
  @Column()
  @Index()
  public AuthorID: number;

  @Column()
  @Index()
  public EditorID: number;

  @ManyToOne(() => User, (user) => user.ID, { eager: true })
  @JoinColumn({ name: 'AuthorID' })
  public author?: User;

  @ManyToOne(() => User, (user) => user.ID, { eager: true })
  @JoinColumn({ name: 'EditorID' })
  public editor?: User;
}
