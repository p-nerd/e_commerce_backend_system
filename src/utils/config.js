const APP_PORT = parseInt(process.env.APP_PORT);
const MONGODB_URI = process.env.MONGODB_URI;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRES_IN_MINUTE = 60 * (parseInt(process.env.JWT_EXPIRES_IN_MINUTE));
const REDIS_URI = process.env.REDIS_URI;
const DEFAULT_REDIS_EXPIRE = parseInt(process.env.DEFAULT_REDIS_EXPIRE);
const NODE_ENV = process.env.NODE_ENV;
const BASE_API_PATH = process.env.BASE_API_PATH;
const MONGODB_TRANSPORT = process.env.MONGODB_TRANSPORT === "true";

module.exports = {
    APP_PORT,
    MONGODB_URI,
    SALT_ROUNDS,
    JWT_EXPIRES_IN_MINUTE,
    JWT_SECRET_KEY,
    REDIS_URI,
    DEFAULT_REDIS_EXPIRE,
    NODE_ENV,
    BASE_API_PATH,
    MONGODB_TRANSPORT
};
