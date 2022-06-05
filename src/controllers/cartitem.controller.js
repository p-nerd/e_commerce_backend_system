const { authenticate } = require("../middlewares/authorization.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { CartitemCreateSchema } = require("../models/cartitem.model");
const cartitemService = require("../services/cartitem.service");
const productService = require("../services/product.service");

const cartitemRouter = require("express").Router();

const createCartitem = async (req, res, next) => {
    try {
        req.body.user = req.user.id;
        req.body.price = await productService.getPrice(req.body.product)
        req.body.total_price = req.body.count * req.body.price;
        const cartitem = await cartitemService.save(req.body);
        return res.status(201).send(cartitem);
    } catch (err) {
        return next(err);
    }
};

const getAllCartitemsForCurrentUser = async (req, res, next) => {
    try {
        const cartitems = await cartitemService.getManyByUserId(req.user.id);
        return res.status(200).send(cartitems);
    } catch (err) {
        return next(err);
    }
};

const deleteAllCartitemsForCurrentUser = async (req, res, next) => {
    try {
        await cartitemService.deleteManyByUserId(req.user.id);
        return res.status(200).send({ "message": "Delete all the cartitems" });
    } catch (err) {
        return next(err);
    }
}

cartitemRouter
    .route("/")
    .post([validate(CartitemCreateSchema), authenticate], createCartitem)
    .get([authenticate], getAllCartitemsForCurrentUser)
    .delete([authenticate], deleteAllCartitemsForCurrentUser)

module.exports = cartitemRouter;