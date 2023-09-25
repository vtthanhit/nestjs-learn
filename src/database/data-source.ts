import { DataSource } from 'typeorm';

import config from '../config/config';

const dbOption = config().database;

export const AppDataSource = new DataSource({
  type: dbOption.type,
  host: dbOption.host,
  port: dbOption.port,
  username: dbOption.username,
  password: dbOption.password,
  database: dbOption.db,
  synchronize: false,
  logging: false,
  entities: ['dist/modules/**/entities/*.entity.js'],
  subscribers: [],
  migrations: ['dist/database/migrations/*.js'],
  extra: {
    charset: 'utf8mb4_general_ci',
  },
  charset: 'utf8mb4_general_ci',
  supportBigNumbers: true,
  bigNumberStrings: false,
});
