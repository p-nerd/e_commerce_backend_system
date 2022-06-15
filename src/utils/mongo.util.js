const mongoose = require("mongoose");
const { log } = require("../services/utils.service");
const { MONGODB_URI } = require("./config.util");

module.exports = async () => {
    await mongoose.connect(MONGODB_URI);
    log(`Connected to MongoDB successful with ${MONGODB_URI}`);
};
