const { ProductDataModel, ProductResModel, ProductCreateSchema } = require("../models/product.model");
const { InternalSeverError, NotFoundError } = require("../utils/errors.util");

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
    getMany = async () => {
        try {
            const products = await ProductDataModel.find();
            return products.map((product) => new ProductResModel(product));
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    };
    getOne = async (productId) => {
        try {
            const product = await ProductDataModel.findOne({ _id: productId });
            if (!product) throw new NotFoundError("product not found by the id");
            return new ProductResModel(product);
        } catch (err) {
            if (err.status && err.status === 404) throw err;
            throw new InternalSeverError(err.message);
        }
    };
    deleteOne = async (productId) => {
        try {
            return await ProductDataModel.deleteOne({ _id: productId });
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    };
    updateOne = async (productId, payload) => {
        try {
            const product = await ProductDataModel.findOneAndUpdate(
                { _id: productId }, payload, { new: true });
            return new ProductResModel(product);
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    };
    getPrice = async (productId) => {
        try {
            const product = await this.getOne(productId);
            return product.price;
        } catch (err) {
            if (err.status && err.status === 404) throw err;
            throw new InternalSeverError(err.message);
        }
    }
}

const productService = new ProductService();
module.exports = productService;