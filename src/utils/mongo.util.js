const mongoose = require("mongoose");
const { MONGODB_URI } = require("../utils/config.util");
const logger = require("./logger.util");

module.exports = async () => {
    await mongoose.connect(MONGODB_URI);
    logger.info(`Connected to MongoDB successful with ${MONGODB_URI}`);
};
