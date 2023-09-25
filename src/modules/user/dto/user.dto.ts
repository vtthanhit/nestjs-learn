import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

import { BaseDto } from '../../../common/base.dto';

@ObjectType()
export class UserDto extends BaseDto {
  @Field(() => String)
  @Expose()
  readonly username: string;
}
