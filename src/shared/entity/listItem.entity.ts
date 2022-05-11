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
  @Column({ default: null })
  @Index()
  public AuthorID: string;

  @Column({ default: null })
  @Index()
  public EditorID: string;

  @ManyToOne(() => User, (user) => user._id, { eager: true })
  @JoinColumn({ name: 'AuthorID' })
  public author?: User;

  @ManyToOne(() => User, (user) => user._id, { eager: true })
  @JoinColumn({ name: 'EditorID' })
  public editor?: User;
}
