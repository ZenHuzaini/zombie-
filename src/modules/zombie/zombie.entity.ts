import { Column, Entity, Index, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Zombie {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn() //for Public ID. exposing ID / GUID would be a threat
  id: string;

  @Column()
  @Index({ unique: true, where: 'name IS NOT NULL' })
  name: string;

  @Column()
  dateCreated: string; //Provided for public . Though I think it would not be necessary. Just

  @Column()
  gender: string;
}
