import { ListItem } from 'src/shared/entity/listItem.entity';
import { Column, Entity, Index, Unique } from 'typeorm';

@Entity()
export class Zombie extends ListItem {
  @Column()
  @Index({ unique: true })
  name: string;

  @Column()
  gender: string;

  @Column()
  ageCategory: string;
}
