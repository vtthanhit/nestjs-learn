import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

@InputType()
export class RegisterUserDto {
  @Field(() => String)
  @IsString()
  readonly username: string;

  @Field(() => String)
  @IsEmail()
  readonly email: string;

  @Field(() => String)
  @IsStrongPassword()
  readonly password: string;
}
