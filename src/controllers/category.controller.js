const { BadRequestError, response } = require("../utils/response");
const categoryService = require("./../services/category.service");
const {} = require("express");
const categoryRouter = require("express").Router();
const { validate } = require("../middlewares/validate");
const {
    CategoryCreateSchema,
    CategoryUpdateSchema
} = require("./../models/category.model");
const { authenticate } = require("../middlewares/authorization");

const createCategory = async (req, res, next) => {
    try {
        await categoryService.getOneByName(req.body.name);
        return next(new BadRequestError("category already exits"));
    } catch (err) {}
    try {
        const category = await categoryService.saveOne(req.body);
        return response(res, "New Category created", category, 201);
    } catch (err) {
        return next(err);
    }
};

const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getMany();
        return response(res, "Get all categories", categories);
    } catch (err) {
        return next(err);
    }
};

const getCategory = async (req, res, next) => {
    try {
        const category = await categoryService.getOneByName(
            req.params.categoryName
        );
        return response(res, "Get one category", category);
    } catch (err) {
        return next(err);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const categoryName = req.params.categoryName;
        await categoryService.getOneByName(categoryName);
        await categoryService.deleteOneByName(categoryName);
        return response(res, "Delete your category successfully");
    } catch (err) {
        return next(err);
    }
};

const updateCategory = async (req, res, next) => {
    try {
        await categoryService.getOneByName(req.params.categoryName);
        const updatedCategory = await categoryService.update(
            req.params.categoryName,
            req.body
        );
        return response(res, "Update the category", updatedCategory);
    } catch (err) {
        return next(err);
    }
};

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
