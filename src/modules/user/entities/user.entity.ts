import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../../common/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({
    name: 'username',
    type: 'varchar',
    precision: 0,
  })
  username: string;

  @Column({
    name: 'password',
    type: 'varchar',
    precision: 0,
  })
  password: string;
}
