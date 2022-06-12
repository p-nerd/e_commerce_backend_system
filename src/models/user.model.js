const { model, Schema } = require("mongoose");
const Joi = require("joi");

const UserCreateSchema = Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const UserUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
    role: Joi.string().optional().valid("user", "manager", "admin")
})
    .or("name", "email", "password", "role")
    .required();

const UserDataModel = model(
    "User",
    Schema({
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["user", "manager", "admin"],
            default: "user"
        }
    })
);

class UserResModel {
    constructor(user) {
        this._id = user._id;
        if (user.name) this.name = user.name;
        this.email = user.email;
        this.role = user.role;
    }
}

module.exports = {
    UserCreateSchema,
    UserUpdateSchema,
    UserDataModel,
    UserResModel
};
