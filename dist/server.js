"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// filepath: /home/zinmyomaung/Node.js/online-marketplace/src/server.ts
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const database_1 = require("./config/database");
const routes_1 = require("./api/routes");
const enviroment_1 = require("./config/enviroment");
const logger_1 = require("./common/utils/logger");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use((0, helmet_1.default)());
        app.use((0, cors_1.default)());
        app.use((0, compression_1.default)());
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use('/api', routes_1.apiRoutes);
        // Database connection 
        try {
            yield database_1.sequelize.authenticate();
            logger_1.logger.info('Database connected successfully.');
            if (enviroment_1.enviroment.nodeEnv === 'development') {
                yield database_1.sequelize.sync({ alter: true });
                logger_1.logger.info('Database models synchronized.');
            }
        }
        catch (error) {
            logger_1.logger.error('Unable to connect to the database ', error);
            process.exit(1);
        }
        app.listen(enviroment_1.enviroment.port, () => {
            logger_1.logger.info(`Server running on port ${enviroment_1.enviroment.port}.`);
        });
    });
}
bootstrap().catch((error) => {
    process.exit(1);
});
