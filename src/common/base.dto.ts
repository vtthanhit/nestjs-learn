import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class BaseDto {
  @Field(() => ID)
  @Expose()
  readonly id: string;

  @Field({ nullable: true })
  @Expose()
  readonly updated: Date;

  @Field({ nullable: true })
  @Expose()
  readonly created: Date;
}
