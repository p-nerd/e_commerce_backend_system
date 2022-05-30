require("dotenv").config();

const APP_PORT = process.env.APP_PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const SALT_ROUNDS = 10;
const JWT_SECRET_KEY = "blablabla";
const JWT_EXPIRES_IN = `${60000 * "60"}ms`;

module.exports = {
    APP_PORT,
    MONGODB_URI,
    SALT_ROUNDS,
    JWT_EXPIRES_IN,
    JWT_SECRET_KEY
}