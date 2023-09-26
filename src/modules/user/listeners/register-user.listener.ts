import { ConfigService } from '@nestjs/config';
import { MailService } from './../../../mailer/mail.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { RegisterUserEvent } from '../envents/register-user.event';

@Injectable()
export class RegisterUserListener {
  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  @OnEvent('user.register')
  async handleRegisterUserEvent(event: RegisterUserEvent) {
    const { email, username } = event;
    try {
      await this.mailService.sendMail(
        email,
        this.configService.get('mail.from'),
        'Welcom to my website',
        './welcome',
        { username },
      );
    } catch (error) {
      console.log(error);
    }
  }
}
