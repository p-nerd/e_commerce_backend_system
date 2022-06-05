const productRouter = require("express").Router();
const productService = require("./../services/product.service");
const { authenticate, manager } = require("../middlewares/authorization.middleware");
const { ProductCreateSchema, ProductUpdateSchema } = require("../models/product.model");
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

const getProduct = async (req, res, next) => {
    try {
        const product = await productService.getOneById(req.params.productId);
        return res.status(200).send(product);
    } catch (err) {
        return next(err);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        await productService.deleteOneById(req.params.productId);
        return res.status(200).send({ "message": "Product deleted successfully" });
    } catch (err) {
        return next(err);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        await productService.getOneById(req.params.productId);
        const product = await productService.updateOneById(req.params.productId, req.body);
        return res.status(200).send(product);
    } catch (err) {
        return next(err);
    }
};

productRouter
    .route("/")
    .post([validate(ProductCreateSchema), authenticate, manager], createProduct)
    .get(authenticate, getProducts);

productRouter
    .route("/:productId")
    .get([authenticate], getProduct)
    .delete([authenticate], deleteProduct)
    .patch([validate(ProductUpdateSchema), authenticate, manager], updateProduct);

module.exports = productRouter;