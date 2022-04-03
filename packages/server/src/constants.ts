import * as dotenv from 'dotenv';

dotenv.config({
  path: '../../.env',
  debug: true,
});

const environment: Environment = {
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  EXPIRE_TIME: process.env.EXPIRE_TIME,
};

interface Environment {
  DB_USER: string;
  DB_PASS: string;
  DB_HOST: string;
  DB_PORT: string;
  JWT_SECRET: string;
  EXPIRE_TIME: string;
}

export default environment;
