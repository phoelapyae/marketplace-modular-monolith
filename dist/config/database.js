"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const enviroment_1 = require("./enviroment");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'postgres',
    host: enviroment_1.enviroment.dbHost,
    port: enviroment_1.enviroment.dbPort,
    username: enviroment_1.enviroment.dbUsername,
    password: enviroment_1.enviroment.dbPassword,
    database: enviroment_1.enviroment.dbName,
    logging: enviroment_1.enviroment.nodeEnv === 'development',
    models: [__dirname + '/../**/*.model.ts'],
});
