const { ProfileDataModel, ProfileResModel } = require("./../models/profile.model");
const { InternalSeverError, NotFoundError } = require("./../utils/errors.util");

class ProfileService {
    saveOne = async (payload) => {
        try {
            const profile = new ProfileDataModel(payload);
            const savedProfile = await profile.save();
            return new ProfileResModel(savedProfile);
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    };
    getOneByUserId = async (userId) => {
        try {
            const profile = await ProfileDataModel.findOne({ user: userId });
            if (!profile) throw new NotFoundError("profile not found by the user id");
            return new ProfileResModel(profile);
        } catch (err) {
            if (err.status && err.status === 404) throw err;
            throw new InternalSeverError(err.message);
        }
    };
    deleteOneByUserId = async (userId) => {
        try {
            return await ProfileDataModel.deleteOne({ user: userId });
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    };
    updateByUserId = async (userId, payload) => {
        try {
            const updatedProfile = await ProfileDataModel.findOneAndUpdate({ user: userId }, payload, { new: true });
            return new ProfileResModel(updatedProfile);
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    }
}

const profileService = new ProfileService;
module.exports = profileService;