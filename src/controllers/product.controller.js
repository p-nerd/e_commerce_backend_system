const productRouter = require("express").Router();
const productService = require("./../services/product.service");
const { authenticate, manager } = require("../middlewares/authorization.middleware");
const { ProductCreateSchema } = require("../models/product.model");
const productService = require("../services/product.service");
const { validate } = require("./../middlewares/validate.middleware");

const createProduct = async (req, res, next) => {
    const product = productService.saveOne(req.body);
};


productRouter
    .route("/")
    .post([validate(ProductCreateSchema), authenticate, manager], createProduct);

module.exports = productRouter;