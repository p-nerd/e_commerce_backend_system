const { ProductDataModel, ProductResModel, ProductCreateSchema } = require("../models/product.model");
const { InternalSeverError } = require("../utils/errors.util");

class ProductService {
    saveOne = async (payload) => {
        try {
            const product = new ProductDataModel(payload);
            const savedProduct = await product.save();
            return new ProductResModel(savedProduct)
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    };
    getAll = async () => {
        try {
            const products = await ProductDataModel.find();
            return products.map((product) => new ProductResModel(product));
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    };
}

const productService = new ProductService();
module.exports = productService;