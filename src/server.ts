// filepath: /home/zinmyomaung/Node.js/online-marketplace/src/server.ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { sequelize } from './config/database';
import { apiRoutes } from './api/routes';
import { enviroment } from './config/enviroment';
import { logger } from './common/utils/logger';
import { errorMiddleware } from './common/middleware/error.middleware';

async function bootstrap() {
    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api', apiRoutes);

    // Error Handling
    app.use(errorMiddleware);

    // Database connection 
    try {
        await sequelize.authenticate();
        logger.info('Database connected successfully.');

        // if (enviroment.nodeEnv === 'development') {
        //     await sequelize.sync({ alter: true });
        //     logger.info('Database models synchronized.');
        // }
    } catch (error) {
        logger.error('Unable to connect to the database ', error);
        process.exit(1);
    }

    app.listen(enviroment.port, () => {
        logger.info(`Server running on port ${enviroment.port}.`);
    });
}

bootstrap().catch((error) => {
    logger.error('Error starting server: ', error);
    process.exit(1);
});