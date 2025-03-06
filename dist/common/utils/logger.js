"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const enviroment_1 = require("../../config/enviroment");
const formats = [
    winston_1.default.format.timestamp(),
    winston_1.default.format.json()
];
exports.logger = winston_1.default.createLogger({
    level: enviroment_1.enviroment.nodeEnv === 'development' ? 'debug' : 'info',
    format: winston_1.default.format.combine(...formats),
    transports: [
        new winston_1.default.transports.Console()
    ]
});
