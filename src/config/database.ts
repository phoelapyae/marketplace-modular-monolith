import { Sequelize } from 'sequelize-typescript';
import { enviroment } from './enviroment';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: enviroment.dbHost,
  port: enviroment.dbPort,
  username: enviroment.dbUsername,
  password: enviroment.dbPassword,
  database: enviroment.dbName,
  logging: enviroment.nodeEnv === 'development',
  models: [__dirname + '/../**/*.model.ts'],
});