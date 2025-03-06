import winston from "winston";
import { enviroment } from "../../config/enviroment";

const formats = [
    winston.format.timestamp(),
    winston.format.json()
];

export const logger = winston.createLogger({
    level: enviroment.nodeEnv === 'development' ? 'debug' : 'info',
    format: winston.format.combine(...formats),
    transports: [
        new winston.transports.Console()
    ]
});