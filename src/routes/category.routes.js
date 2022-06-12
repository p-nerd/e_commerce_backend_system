const categoryRouter = require("express").Router();
const { validate } = require("./../middlewares/validate.middleware");
const {
    CategoryCreateSchema,
    CategoryUpdateSchema
} = require("./../models/category.model");
const { authenticate } = require("./../middlewares/authorization.middleware");
const {
    createCategory,
    getCategories,
    getCategory,
    deleteCategory,
    updateCategory
} = require("./../controllers/category.controller");

categoryRouter
    .route("/")
    .post(validate(CategoryCreateSchema), authenticate, createCategory)
    .get(authenticate, getCategories);

categoryRouter
    .route("/:categoryName")
    .get(authenticate, getCategory)
    .delete(authenticate, deleteCategory)
    .patch(validate(CategoryUpdateSchema), authenticate, updateCategory);

module.exports = categoryRouter;
