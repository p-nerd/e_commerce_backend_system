const User = require("../models/user.model");
const { InternalSeverError } = require("../utils/errors.util");

const save = async (payload) => {
    const user = new User(payload);
    try {
        const savedUser = await user.save();
        return savedUser;
    } catch (err) {
        throw new InternalSeverError(err.message);
    }
};

module.exports = {
    save,
}