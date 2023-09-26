import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { MailModule } from '../../mailer/mail.module';
import { RegisterUserListener } from './listeners/register-user.listener';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule],
  providers: [UserResolver, UserService, RegisterUserListener],
})
export class UserModule {}
