const { model, Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

const ProductDataModel = model("Product", Schema({
    product: { type: ObjectId, required: true, ref: "Product" },
    price: { type: Number, required: true },
    count: { type: Number, required: true },
    user: { type: ObjectId, required: true, ref: "User" },
}));

module.exports = {
    ProductDataModel,
}