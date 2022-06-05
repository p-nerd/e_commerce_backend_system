const productRouter = require("express").Router();
const productService = require("./../services/product.service");
const { authenticate, manager } = require("../middlewares/authorization.middleware");
const { ProductCreateSchema } = require("../models/product.model");
const { validate } = require("./../middlewares/validate.middleware");

const createProduct = async (req, res, next) => {
    try {
        const product = await productService.saveOne(req.body);
        return res.status(201).send(product);
    } catch (err) {
        return next(err);
    }
};

const getProducts = async (req, res, next) => {
    try {
        const products = await productService.getAll();
        return res.status(200).send(products);
    } catch (err) {
        return next(err);
    }
};

productRouter
    .route("/")
    .post([validate(ProductCreateSchema), authenticate, manager], createProduct)
    .get(getProducts);

module.exports = productRouter;