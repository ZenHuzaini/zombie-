import { Field } from '@nestjs/graphql';
import { ZombieCategoryType } from './zombie.types';

class ZombieDTOBase {
  @Field()
  public name: string;

  @Field({ nullable: true })
  public gender: ZombieCategoryType;

  @Field()
  public dateCreated: Date;
}
