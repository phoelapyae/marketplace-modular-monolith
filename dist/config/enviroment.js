"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviroment = void 0;
exports.enviroment = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: parseInt(process.env.DB_PORT || '5432', 10),
    dbUsername: process.env.DB_USERNAME || 'postgres',
    dbPassword: process.env.DB_PASSWORD || 'postgres',
    dbName: process.env.DB_NAME || 'marketplace_db',
};
