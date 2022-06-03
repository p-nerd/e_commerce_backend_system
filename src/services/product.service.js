const { ProductDataModel } = require("../models/product.model");

class ProductService {
    saveOne = async (payload) => {
        const product = new ProductDataModel(payload);
        const savedProduct = await product.save();
        return new ProductResModel(savedProduct)
    };
}

const productService = new ProductService();
module.exports = productService;