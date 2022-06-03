const { UserDataModel, UserResModel } = require("../models/user.model");
const { InternalSeverError, NotFoundError, BadRequestError } = require("../utils/errors.util");

class UserService {
    saveOne = async (payload) => {
        try {
            const user = new UserDataModel(payload);
            const savedUser = await user.save();
            return new UserResModel(savedUser);
        } catch (err) {
            if (err.code === 11000) throw new BadRequestError("Email must be unique");
            throw new InternalSeverError(err.message);
        }
    };
    updateOne = async (id, payload) => {
        try {
            const updateUser = await UserDataModel.findByIdAndUpdate(id, payload, { new: true });
            return new UserResModel(updateUser);
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    }
    giveMany = async () => {
        try {
            const users = await UserDataModel.find();
            return users.map(user => new UserResModel(user));
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    }
    giveOne = async (id) => {
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
    deleteOne = async (id) => {
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
}

const userService = new UserService();
module.exports = userService;