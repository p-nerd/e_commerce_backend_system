const { BadRequestError, response } = require("../utils/response");
const profileService = require("./../services/profile.service");
const { validate } = require("../middlewares/validate");
const {
    ProfileCreateSchema,
    ProfileUpdateSchema
} = require("../models/profile.model");
const { authenticate } = require("../middlewares/authorization");
const profileRouter = require("express").Router();

const createProfile = async (req, res, next) => {
    try {
        await profileService.getOneByUserId(req.user._id);
        return next(
            new BadRequestError(
                "profile already exits, please do update request"
            )
        );
    } catch (err) {}
    try {
        req.body.user = req.user._id;
        const profile = await profileService.saveOne(req.body);
        return response(res, "Profile created for the user", profile, 201);
    } catch (err2) {
        return next(err2);
    }
};

const getProfile = async (req, res, next) => {
    try {
        const userId =
            req.query.user && req.user.role !== "user"
                ? req.query.user
                : req.user._id;
        const profile = await profileService.getOneByUserId(userId);
        return response(res, "Get logged in user profile", profile);
    } catch (err) {
        return next(err);
    }
};

const deleteProfile = async (req, res, next) => {
    try {
        await profileService.getOneByUserId(req.user._id);
        await profileService.deleteOneByUserId(req.user._id);
        return response(res, "Delete logged in user profile successfully");
    } catch (err) {
        return next(err);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        await profileService.getOneByUserId(req.user._id);
        const updatedProfile = await profileService.updateByUserId(
            req.user._id,
            req.body
        );
        return response(res, "Update logged in user profile", updatedProfile);
    } catch (err) {
        return next(err);
    }
};

profileRouter
    .route("/")
    .post([validate(ProfileCreateSchema), authenticate], createProfile)
    .get([authenticate], getProfile)
    .delete([authenticate], deleteProfile)
    .patch([validate(ProfileUpdateSchema), authenticate], updateProfile);

module.exports = profileRouter;
