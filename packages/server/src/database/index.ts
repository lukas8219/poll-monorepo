import { Sequelize } from 'sequelize';
import env from '../constants';

const { DB_HOST, DB_PASS, DB_PORT, DB_USER } = env;

const Database = new Sequelize(
  `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`,
  {
    logQueryParameters: true,
  },
);

export default Database;
