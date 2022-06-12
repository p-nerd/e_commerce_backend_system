const { authenticate } = require("../middlewares/authorization.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { CartitemCreateSchema } = require("../models/cartitem.model");
const cartitemRouter = require("express").Router();
const {
    createCartitem,
    getAllCartitemsForCurrentUser,
    deleteAllCartitemsForCurrentUser
} = require("./../controllers/cartitem.controller");

cartitemRouter
    .route("/")
    .post([validate(CartitemCreateSchema), authenticate], createCartitem)
    .get([authenticate], getAllCartitemsForCurrentUser)
    .delete([authenticate], deleteAllCartitemsForCurrentUser);

module.exports = cartitemRouter;
