const profileRouter = require("express").Router();
const { validate } = require("../middlewares/validate.middleware");
const {
    ProfileCreateSchema,
    ProfileUpdateSchema
} = require("../models/profile.model");
const { authenticate } = require("./../middlewares/authorization.middleware");
const {
    createProfile,
    getProfile,
    deleteProfile,
    updateProfile
} = require("./../controllers/profile.controller");

profileRouter
    .route("/")
    .post([validate(ProfileCreateSchema), authenticate], createProfile)
    .get([authenticate], getProfile)
    .delete([authenticate], deleteProfile)
    .patch([validate(ProfileUpdateSchema), authenticate], updateProfile);

module.exports = profileRouter;
