const mongoose = require("mongoose");
const Joi = require("joi");

const ProfileDataModel = mongoose.model("Profile", mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true,
        ref: "User"
    },
    phone: { type: Number, required: true },
    address1: { type: String, required: true },
    address2: { type: String },
    country: { type: String, required: true },
    city: { type: String },
    photo: { type: String }
}));

const ProfileCreateSchema = Joi.object({
    phone: Joi.number().required(),
    address1: Joi.string().required(),
    address2: Joi.string(),
    country: Joi.string().required(),
    city: Joi.string(),
    photo: Joi.string()
});

const ProfileUpdateSchema = Joi.object({
    phone: Joi.number().optional(),
    address1: Joi.string().optional(),
    address2: Joi.string().optional(),
    country: Joi.string().optional(),
    city: Joi.string().optional(),
    photo: Joi.string().optional(),
}).or("phone", "address1", "address2", "country", "city", "photo").required();

class ProfileResModel {
    constructor(profile) {
        this._id = profile._id;
        this.user = profile.user;
        this.phone = profile.phone;
        this.address1 = profile.address1;
        if (profile.address2) this.address2 = profile.address2;
        this.country = profile.country;
        if (profile.city) this.city = profile.city;
        if (profile.photo) this.photo = profile.photo;
    }
}

module.exports = {
    ProfileDataModel,
    ProfileCreateSchema,
    ProfileResModel,
    ProfileUpdateSchema,
}