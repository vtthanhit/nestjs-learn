import { config } from 'dotenv';

config();

export default () => ({
  database: {
    type: process.env.DATABASE_DRIVER as 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    db: process.env.DATABASE_DB,
  },
});
