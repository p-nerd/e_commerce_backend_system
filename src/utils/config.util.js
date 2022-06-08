require("dotenv").config();

const APP_PORT = parseInt(process.env.APP_PORT)
    || 3000;
const MONGODB_URI = process.env.MONGODB_URI
    || "mongodb://localhost:27017/e-commerce-backend-system";
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
    || 10;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
    || "blablabla";
const JWT_EXPIRES_IN_MINUTE = 60 * (parseInt(process.env.JWT_EXPIRES_IN_MINUTE)
    || 60);
const REDIS_URI = process.env.REDIS_URI
    || "redis://127.0.0.1:6379";

module.exports = {
    APP_PORT,
    MONGODB_URI,
    SALT_ROUNDS,
    JWT_EXPIRES_IN_MINUTE,
    JWT_SECRET_KEY,
    REDIS_URI
}