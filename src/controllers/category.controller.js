const { BadRequestError } = require("./../utils/errors.util");
const categoryService = require("./../services/category.service");

const createCategory = async (req, res, next) => {
    try {
        await categoryService.getOneByName(req.body.name);
        return next(new BadRequestError("category already exits"));
    } catch (err) {}
    try {
        const category = await categoryService.saveOne(req.body);
        return res.status(201).send(category);
    } catch (err) {
        return next(err);
    }
};

const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getMany();
        return res.status(200).send(categories);
    } catch (err) {
        return next(err);
    }
};

const getCategory = async (req, res, next) => {
    try {
        const category = await categoryService.getOneByName(
            req.params.categoryName
        );
        return res.status(200).send(category);
    } catch (err) {
        return next(err);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        await categoryService.getOneByName(req.params.categoryName);
        await categoryService.deleteOneByName(req.params.categoryName);
        return res.status(200).send("Delete your category successfully");
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
        return res.status(200).send(updatedCategory);
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    deleteCategory,
    updateCategory
};
