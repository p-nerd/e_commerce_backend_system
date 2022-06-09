const mongoose = require("mongoose");
const { MONGODB_URI } = require("../utils/config.util");

module.exports = async () => {
    await mongoose.connect(MONGODB_URI);
    console.info(`Connected to MongoDB successful with ${MONGODB_URI}`);
};;