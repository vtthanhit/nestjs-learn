import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterUserEvent } from './envents/register-user.event';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) readonly userRepo: Repository<User>,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  async register(registerUser: RegisterUserDto): Promise<User> {
    const { username, password, email } = registerUser;
    const hashPassword = bcrypt.hashSync(password, 10);

    const findUser = await this.userRepo.findOneBy({ username });

    if (findUser) {
      throw new BadRequestException('User existed');
    }

    const user = this.userRepo.create({
      username,
      password: hashPassword,
      email,
    });
    await this.userRepo.save(user);

    const registerUserEvent = new RegisterUserEvent();
    registerUserEvent.username = user.username;
    registerUserEvent.email = user.email;
    this.eventEmitter.emit('user.register', registerUserEvent);

    return user;
  }
}
