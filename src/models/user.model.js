const mongoose = require("mongoose");
const Joi = require("joi");

const UserCreateSchema = Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const UserDataModel = mongoose.model("User", mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }
}));

class UserResModel {
    constructor(user) {
        this._id = user._id;
        this.name = user.name;
        this.username = user.username;
        this.email = user.email;
    }
}

module.exports = {
    UserCreateSchema,
    UserDataModel,
    UserResModel
};
