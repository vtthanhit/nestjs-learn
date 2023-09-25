import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => UserDto)
  async registerUser(
    @Args('registerUser') registerUser: RegisterUserDto,
  ): Promise<UserDto> {
    const user = await this.userService.register(registerUser);

    return plainToInstance(UserDto, user);
  }
}
