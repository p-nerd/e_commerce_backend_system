const mongoose = require("mongoose");
const { MONGODB_URI } = require("../utils/config.util");
const logService = require("./../services/log.service");

module.exports = async () => {
    await mongoose.connect(MONGODB_URI);
    logService.info(`Connected to MongoDB successful with ${MONGODB_URI}`);
};
