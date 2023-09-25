import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) readonly userRepo: Repository<User>,

    private readonly mailerService: MailerService,
  ) {}

  async register(registerUser: RegisterUserDto): Promise<User> {
    const { username, password, email } = registerUser;
    const hashPassword = bcrypt.hashSync(password, 10);

    const user = this.userRepo.create({
      username,
      password: hashPassword,
      email,
    });
    await this.userRepo.save(user);

    return user;
  }
}
