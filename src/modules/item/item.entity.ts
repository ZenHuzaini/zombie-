import { ListItem } from 'src/shared/entity/listItem.entity';
import { Column, Entity, Index, Unique } from 'typeorm';

@Entity()
export class Item extends ListItem {
  @Column()
  @Index({ unique: true })
  name: string;

  @Column()
  price: number;
}
