const { model, Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

const ProductDataModel = model("Profile", Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    category: { type: ObjectId, required: true, ref: "Category" },
    quantity: { type: Number, default: 0 },
    phone: { type: [String] },
}));

module.exports = {
    ProductDataModel
}