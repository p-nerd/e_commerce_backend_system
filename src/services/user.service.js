const { UserDataModel, UserResModel } = require("../models/user.model");
const { InternalSeverError, NotFoundError } = require("../utils/errors.util");

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

const giveOne = async (id) => {
    try {
        const user = await UserDataModel.findById(id);
        if (!user)
            throw new NotFoundError("user not found by the id");
        return new UserResModel(user);
    } catch (err) {
        if (err.status && err.status === 404)
            throw err;
        throw new InternalSeverError(err.message);
    }
};

const deleteOne = async (id) => {
    try {
        const user = await UserDataModel.findById(id);
        if (!user)
            throw new NotFoundError("user not found by the id");
        await UserDataModel.deleteOne({ _id: id });
        return;
    } catch (err) {
        if (err.status && err.status === 404)
            throw err;
        throw new InternalSeverError(err.message);
    }
};

module.exports = {
    save,
    update,
    giveAll,
    giveOne,
    deleteOne
}