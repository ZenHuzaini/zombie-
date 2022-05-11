import { Column, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';

import {
  ListItemWithoutUserInfo,
  LIST_ITEM_WITHOUT_USER_INFO_UNIQUE_FIELDS,
} from '../../shared/entity/listitemWithoutUserInfo.entity';

@Unique(LIST_ITEM_WITHOUT_USER_INFO_UNIQUE_FIELDS)
export class User extends ListItemWithoutUserInfo {
  @Column({ nullable: true })
  @Index({ unique: true, where: 'email IS NOT NULL' })
  public email: string;

  @Column({ nullable: true })
  public name: string;

  @Column({ nullable: true })
  @Index()
  public AuthorID: number;

  @Column({ nullable: true })
  @Index()
  public EditorID: number;

  @ManyToOne(() => User, (user) => user.ID, { nullable: true })
  @JoinColumn({ name: 'AuthorID' })
  public author: User;

  @ManyToOne(() => User, (user) => user.ID, { nullable: true })
  @JoinColumn({ name: 'EditorID' })
  public editor: User;
}
