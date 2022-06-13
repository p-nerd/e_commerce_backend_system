const cartitemService = require("../services/cartitem.service");
const productService = require("../services/product.service");
const { response } = require("../utils/response.util");

const createCartitem = async (req, res, next) => {
    try {
        req.body.user = req.user.id;
        req.body.price = await productService.getPrice(req.body.product);
        req.body.total_price = req.body.count * req.body.price;
        const cartitem = await cartitemService.saveOne(req.body);
        return response(res, "Create cartitem", cartitem, 201);
    } catch (err) {
        return next(err);
    }
};

const getAllCartitemsForCurrentUser = async (req, res, next) => {
    try {
        const cartitems = await cartitemService.getManyByUserId(req.user.id);
        return response(
            res,
            "Get all the cartitems for the logged in user",
            cartitems
        );
    } catch (err) {
        return next(err);
    }
};

const deleteAllCartitemsForCurrentUser = async (req, res, next) => {
    try {
        await cartitemService.deleteManyByUserId(req.user.id);
        return response(res, "Delete all the cartitems for the logged in user");
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    createCartitem,
    getAllCartitemsForCurrentUser,
    deleteAllCartitemsForCurrentUser
};
