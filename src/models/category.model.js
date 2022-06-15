const { model, Schema } = require("mongoose");
const Joi = require("joi");

const CategoryDataModel = model(
    "Category",
    new Schema({
        name: { type: String, required: true, unique: true },
        type: {
            type: String,
            enum: ["B2B", "B2C", "C2B", "C2C"],
            default: "B2C"
        }
    })
);

const CategoryCreateSchema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().optional().valid("B2B", "B2C", "C2B", "C2C")
});

const CategoryUpdateSchema = Joi.object({
    type: Joi.string().valid("B2B", "B2C", "C2B", "C2C").required()
});

class CategoryResModel {
    constructor(category) {
        this._id = category._id;
        this.name = category.name;
        this.type = category.type;
    }
}

module.exports = {
    CategoryCreateSchema,
    CategoryUpdateSchema,
    CategoryDataModel,
    CategoryResModel
};
