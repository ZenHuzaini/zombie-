import { ListItem } from 'src/shared/entity/listItem.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Zombie } from '../zombie/zombie.entity';

@Entity()
@Unique(['zombieId'])
export class Item extends ListItem {
  @Column()
  @Index({ unique: true })
  name: string;

  @Column()
  price: number;

  @Index()
  @Column()
  public zombieId: string;

  @ManyToOne(() => Zombie, (zombie) => zombie.AuthorID)
  @JoinColumn({ name: 'zombieId' })
  public zombie: Zombie;
}
