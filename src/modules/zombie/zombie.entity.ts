import { ListItem } from 'src/shared/entity/listItem.entity';
import { Column, Entity, Index, OneToMany, Unique } from 'typeorm';
import { Item } from '../item/item.entity';

@Entity()
export class Zombie extends ListItem {
  @Column()
  @Index({ unique: true })
  name: string;

  @Column()
  gender: string;

  @Column()
  ageCategory: string;

  @OneToMany(() => Item, (item) => item.zombie, { eager: true })
  public items: Item[];
}
