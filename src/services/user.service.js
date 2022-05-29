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

const update = async (id, payload) => {
    try {
        const updateUser = await UserDataModel.findByIdAndUpdate(id, payload, { new: true });
        return new UserResModel(updateUser);
    } catch (err) {
        throw new InternalSeverError(err.message);
    }
}

const giveAll = async () => {
    try {
        const users = await UserDataModel.find();
        return users.map(user => new UserResModel(user));
    } catch (err) {
        throw new InternalSeverError(err.message);
    }
}

module.exports = {
    save,
    update,
    giveAll
}