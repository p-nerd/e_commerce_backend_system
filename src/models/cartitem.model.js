const Joi = require("joi");
const { model, Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

const CartitemCreateSchema = Joi.object({
    product: Joi.string().required().min(24).max(24),
    count: Joi.number().required()
});

const CartitemDataModel = model(
    "Cartitem",
    Schema({
        product: { type: ObjectId, required: true, ref: "Product" },
        price: { type: Number },
        total_price: { type: Number },
        count: { type: Number, required: true },
        user: { type: ObjectId, required: true, ref: "User" }
    })
);

class CartitemResModel {
    constructor(cartitem) {
        this._id = cartitem._id;
        this.product = cartitem.product;
        this.price = cartitem.price;
        this.total_price = cartitem.total_price;
        this.count = cartitem.count;
        this.user = cartitem.user;
    }
}

module.exports = {
    CartitemCreateSchema,
    CartitemDataModel,
    CartitemResModel
};
