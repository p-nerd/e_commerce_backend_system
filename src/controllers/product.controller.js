const { response } = require("../utils/response.util");
const productService = require("./../services/product.service");
const redisService = require("./../services/redis.service");
const {
    authenticate,
    manager
} = require("../middlewares/authorization.middleware");
const {
    ProductCreateSchema,
    ProductUpdateSchema,
    ProductCreateManySchema
} = require("../models/product.model");
const { validate } = require("./../middlewares/validate.middleware");
const { cacheProduct } = require("../middlewares/cache.middleware");
const productRouter = require("express").Router();

const createProduct = async (req, res, next) => {
    try {
        const product = await productService.saveOne(req.body);
        await redisService.set(product._id, product);
        return response(res, "Created product successfully", product, 201);
    } catch (err) {
        return next(err);
    }
};

const createProductMany = async (req, res, next) => {
    try {
        const products = await productService.saveMany(req.body);
        return response(
            res,
            `${products.length} products created`,
            products,
            201
        );
    } catch (err) {
        return next(err);
    }
};

const getProducts = async (req, res, next) => {
    try {
        const products = await productService.getMany(
            req.query.sortby,
            req.query.order,
            req.query.limit
        );
        return response(res, "Get all products by the query", products);
    } catch (err) {
        return next(err);
    }
};

const getProduct = async (req, res, next) => {
    try {
        const product = await productService.getOne(req.params.productId);
        console.log(product);
        await redisService.set(product._id, product);
        return response(res, "Get One product", product);
    } catch (err) {
        return next(err);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        await productService.getOne(productId);
        await productService.deleteOne(productId);
        await redisService.del(productId);
        return response(res, "Product deleted successfully");
    } catch (err) {
        return next(err);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        await productService.getOne(productId);
        const updatedProduct = await productService.updateOne(
            productId,
            req.body
        );
        await redisService.set(updatedProduct._id, updatedProduct);
        return response(res, "Product updated", updatedProduct);
    } catch (err) {
        return next(err);
    }
};

productRouter
    .route("/many")
    .post(
        [validate(ProductCreateManySchema), authenticate, manager],
        createProductMany
    );

productRouter
    .route("/")
    .post([validate(ProductCreateSchema), authenticate, manager], createProduct)
    .get([authenticate], getProducts);

productRouter
    .route("/:productId")
    .get([authenticate, cacheProduct], getProduct)
    .delete([authenticate], deleteProduct)
    .patch(
        [validate(ProductUpdateSchema), authenticate, manager],
        updateProduct
    );

module.exports = productRouter;
