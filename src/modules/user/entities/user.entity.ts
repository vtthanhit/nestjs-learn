import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../../common/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({
    name: 'username',
    type: 'varchar',
  })
  username: string;

  @Column({
    name: 'email',
    type: 'varchar',
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
  })
  password: string;
}
