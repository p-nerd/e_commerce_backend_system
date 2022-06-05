const { CartitemDataModel, CartitemResModel } = require("../models/cartitem.model");
const { InternalSeverError } = require("../utils/errors.util");

class CartitemService {
    save = async (payload) => {
        try {
            const cartitem = new CartitemDataModel(payload)
            const cartItemSaved = await cartitem.save();
            return new CartitemResModel(cartItemSaved);
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    };
    getManyByUserId = async (userId) => {
        try {
            const cartitems = await CartitemDataModel.find({ user: userId });
            return cartitems.map(cartitem => new CartitemResModel(cartitem));
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    };
    deleteManyByUserId = async (userId) => {
        try {
            return await CartitemDataModel.deleteMany({ user: userId });
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    }
}

const cartitemService = new CartitemService();
module.exports = cartitemService;