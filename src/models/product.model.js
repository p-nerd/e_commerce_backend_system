const Joi = require("joi");
const { model, Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

const ProductDataModel = model(
    "Product",
    new Schema({
        title: { type: String, required: true },
        price: { type: Number, required: true },
        categories: {
            type: [{ type: ObjectId, ref: "Category" }],
            required: true
        },
        quantity: { type: Number, default: 0 },
        description: { type: String },
        images: { type: [String] }
    })
);

class ProductResModel {
    constructor(product) {
        this._id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.categories = product.categories;
        this.quantity = product.quantity;
        if (product.description) this.description = product.description;
        if (product.images) this.images = product.images;
    }
}

const ProductCreateSchema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    categories: Joi.array().items(Joi.string()).min(1).required(),
    quantity: Joi.number(),
    description: Joi.string(),
    images: Joi.array().items(Joi.string())
});

const ProductCreateManySchema = Joi.array().items(ProductCreateSchema);

const ProductUpdateSchema = Joi.object({
    title: Joi.string().min(3).max(255).optional(),
    price: Joi.number().optional(),
    categories: Joi.array().items(Joi.string()).min(1).optional(),
    quantity: Joi.number().optional(),
    description: Joi.string().optional(),
    images: Joi.array().items(Joi.string()).optional()
})
    .or("title", "price", "categories", "quantity", "description", "images")
    .required();

const ProductFilterSchema = Joi.object({
    price: Joi.object({ min: Joi.number(), max: Joi.number() }).optional(),
    categories: Joi.array().items(Joi.string()).min(1).optional()
})
    .or("price", "categories")
    .required();

module.exports = {
    ProductCreateSchema,
    ProductCreateManySchema,
    ProductUpdateSchema,
    ProductDataModel,
    ProductResModel,
    ProductFilterSchema
};
