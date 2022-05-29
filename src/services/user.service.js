const { UserDataModel, UserResModel } = require("../models/user.model");
const { InternalSeverError } = require("../utils/errors.util");

const save = async (payload) => {
    try {
        const user = new UserDataModel(payload);
        const savedUser = await user.save(payload);
        return new UserResModel(savedUser);
    } catch (err) {
        throw new InternalSeverError(err.message);
    }
};

module.exports = {
    save,
}