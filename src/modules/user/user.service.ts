import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) readonly userRepo: Repository<User>,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerUser: RegisterUserDto): Promise<User> {
    const { username, email, password } = registerUser;
    const hashPassword = bcrypt.hashSync(password, 10);

    const user = this.userRepo.create({
      username,
      email,
      password: hashPassword,
    });
    await this.userRepo.save(user);

    await this.mailerService.sendMail({
      to: email,
      from: this.configService.get('mail.from'),
      subject: 'Welcome to my website',
      template: './welcome',
      context: { username },
    });

    return user;
  }
}
