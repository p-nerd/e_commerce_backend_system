const mongoose = require("mongoose");
const { MONGODB_URI } = require("../utils/config.util");

const mongodbOptions = {

};

const connectToMongo = async () => {
    await mongoose.connect(MONGODB_URI, mongodbOptions)
};

module.exports = { connectToMongo };