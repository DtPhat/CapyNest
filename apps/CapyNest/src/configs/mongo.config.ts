import { ConnectOptions } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
export const MONGO_HOST = process.env.MONGODB_URI;
export const MONGO_CONFIG = {
} as ConnectOptions;