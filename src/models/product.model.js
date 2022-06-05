const Joi = require("joi");
const { model, Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

const ProductDataModel = model("Product", Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    category: { type: [ObjectId], required: true, ref: "Category" },
    quantity: { type: Number, default: 0 },
    photo: { type: [String] },
}));

const ProductCreateSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number(),
    category: Joi.array().items(Joi.string()).min(1).required(),
    quantity: Joi.number(),
    photo: Joi.array().items(Joi.string()),
});

class ProductResModel {
    constructor(user) {
        this._id = user._id;
        this.name = user.name;
        if (user.description) this.user = user.user;
        if (user.price) this.price = user.price;
        this.category = user.category;
        if (user.quantity) this.quantity = user.quantity;
        if (user.photo) this.photo = user.photo;
    }
}

module.exports = {
    ProductDataModel,
    ProductCreateSchema,
    ProductResModel,
}
