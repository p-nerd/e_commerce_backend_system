const { BadRequestError } = require("../utils/errors.util");
const profileService = require("./../services/profile.service");

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
        return res.status(201).send(profile);
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
        return res.status(200).send(profile);
    } catch (err) {
        return next(err);
    }
};

const deleteProfile = async (req, res, next) => {
    try {
        await profileService.getOneByUserId(req.user._id);
        await profileService.deleteOneByUserId(req.user._id);
        return res.status(200).send("Delete your profile successfully");
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
        return res.status(200).send(updatedProfile);
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    createProfile,
    getProfile,
    deleteProfile,
    updateProfile
};
