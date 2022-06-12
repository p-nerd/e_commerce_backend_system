const Joi = require("joi");
const { model, Schema } = require("mongoose");
// const { ObjectId } = Schema.Types;

const ProductCreateSchema = Joi.object({
    id: Joi.number().optional(),
    title: Joi.string().min(3).max(255).required(),
    price: Joi.number(),
    description: Joi.string(),
    // category: Joi.array().items(Joi.string()).min(1).required(),
    category: Joi.string(),
    // image: Joi.array().items(Joi.string()),
    image: Joi.string(),
    quantity: Joi.number(),
    rating: Joi.object({ rate: Joi.number(), count: Joi.number() })
});

const ProductCreateManySchema = Joi.array().items(
    Joi.object({
        id: Joi.number().optional(),
        title: Joi.string().min(3).max(255).required(),
        price: Joi.number(),
        description: Joi.string(),
        // category: Joi.array().items(Joi.string()).min(1).required(),
        category: Joi.string(),
        // image: Joi.array().items(Joi.string()),
        image: Joi.string(),
        quantity: Joi.number(),
        rating: Joi.object({ rate: Joi.number(), count: Joi.number() })
    })
);

const ProductUpdateSchema = Joi.object({
    title: Joi.string().min(3).max(255).optional(),
    price: Joi.number().optional(),
    description: Joi.string().optional(),
    // category: Joi.array().items(Joi.string()).min(1).optional(),
    category: Joi.string().optional(),
    // image: Joi.array().items(Joi.string()).optional,
    image: Joi.string().optional(),
    quantity: Joi.number().optional(),
    rating: Joi.object({ rate: Joi.number(), count: Joi.number() }).optional()
})
    .or("name", "description", "price", "category", "quantity")
    .required();

const productMongooseSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, default: 0 },
    description: { type: String },
    category: { type: String, required: true },
    image: { type: String },
    quantity: { type: Number, default: 0 },
    rating: {
        rete: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    }
});

productMongooseSchema.index({
    title: "text",
    price: "text",
    description: "text",
    category: "text",
    "rating.rete": "text"
});

const ProductDataModel = model("Product", productMongooseSchema);

class ProductResModel {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        if (product.description) this.description = product.description;
        this.category = product.category;
        if (product.image) this.image = product.image;
        this.quantity = product.quantity;
        if (product.rating) this.rating = product.rating;
    }
}

module.exports = {
    ProductCreateSchema,
    ProductCreateManySchema,
    ProductUpdateSchema,
    ProductDataModel,
    ProductResModel
};
