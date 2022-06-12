const {
    CategoryDataModel,
    CategoryResModel
} = require("./../models/category.model");
const { InternalSeverError, NotFoundError } = require("./../utils/errors.util");

class CategoryService {
    saveOne = async (payload) => {
        try {
            const category = new CategoryDataModel(payload);
            const savedCategory = await category.save();
            return new CategoryResModel(savedCategory);
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    };
    getMany = async () => {
        try {
            const categories = await CategoryDataModel.find();
            return categories.map((category) => new CategoryResModel(category));
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    };
    getOneByName = async (categoryName) => {
        try {
            const category = await CategoryDataModel.findOne({
                name: categoryName
            });
            if (!category)
                throw new NotFoundError("category not found by the name");
            return new CategoryResModel(category);
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    };
    deleteOneByName = async (categoryName) => {
        try {
            return await CategoryDataModel.deleteOne({ name: categoryName });
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    };
    update = async (categoryName, payload) => {
        try {
            const updatedCategory = await CategoryDataModel.findOneAndUpdate(
                { name: categoryName },
                payload,
                { new: true }
            );
            return new CategoryResModel(updatedCategory);
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    };
}

const categoryService = new CategoryService();
module.exports = categoryService;
