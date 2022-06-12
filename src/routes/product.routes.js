const productRouter = require("express").Router();
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
const {
    createProduct,
    createProductMany,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
} = require("./../controllers/product.controller");

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
