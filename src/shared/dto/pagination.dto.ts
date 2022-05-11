import { Field, InputType, Int } from '@nestjs/graphql';

export const DEFAULT_PAGE_SIZE = 100;

@InputType()
export class PaginationDTO {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  public startIndex: number;

  @Field(() => Int, { nullable: true, defaultValue: DEFAULT_PAGE_SIZE })
  public itemCount: number;
}
