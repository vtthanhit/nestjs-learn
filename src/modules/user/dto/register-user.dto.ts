import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsStrongPassword } from 'class-validator';

@InputType()
export class RegisterUserDto {
  @Field(() => String)
  @IsString()
  readonly username: string;

  @Field(() => String)
  @IsStrongPassword()
  readonly password: string;
}
