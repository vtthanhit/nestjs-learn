import { Resolver, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UserResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
