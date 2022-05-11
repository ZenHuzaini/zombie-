import { ListItem } from 'src/shared/entity/listItem.entity';
import { Column, Entity, Index, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Zombie extends ListItem {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn() //for Public ID. exposing ID / GUID would be a threat
  id_: string;

  @Column()
  @Index({ unique: true, where: 'name IS NOT NULL' })
  name: string;

  @Column()
  dateCreated: string; //Provided for public . Though I think it would not be necessary.

  @Column()
  gender: string;

  @Column()
  ageCategory: string;
}
