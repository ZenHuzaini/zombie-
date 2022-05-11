import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class PagedResultDTO<T> {
  @Field()
  public count: number;

  public abstract records: T[];
}
