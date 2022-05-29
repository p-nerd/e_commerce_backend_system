require("dotenv").config();

const APP_PORT = process.env.APP_PORT;
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
    APP_PORT,
    MONGODB_URI
}