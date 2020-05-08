"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const follows_model_1 = __importDefault(require("../models/follows.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
class FollowController {
    constructor() {
    }
    newFollowed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, followed } = req.body;
            let newFollowed = yield follows_model_1.default.create({ user: new mongoose_1.default.Types.ObjectId(user), followed: new mongoose_1.default.Types.ObjectId(followed) });
            res.json(newFollowed);
        });
    }
    lostFollowed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, followed } = req.body;
            let unfollowed = yield follows_model_1.default.deleteOne({ user: user, followed: followed });
            if (unfollowed) {
                res.json({ status: true });
            }
            else {
                res.json({ status: false });
            }
        });
    }
    getFollowed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            const followed = yield follows_model_1.default.find({ user: _id }).populate({
                path: 'followed',
                select: 'fullname username profileImg'
            });
            res.send(followed);
        });
    }
    mutualFollow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            const followed = yield follows_model_1.default.find({ user: _id }).select('followed -_id');
            let followed_clean = [];
            followed.forEach((follow) => {
                followed_clean.push(follow.followed);
            });
            const mutualFollow = yield follows_model_1.default.find({ user: { $in: followed_clean }, followed: _id })
                .populate([{ path: 'user', select: 'username fullname profileImg' }]).select('user -_id');
            res.json(mutualFollow);
        });
    }
    findUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name } = req.body;
            let userMatch = yield user_model_1.default.find({
                $or: [
                    { fullname: { $regex: name, $options: 'i' } },
                    { fullname: { $regex: '.*' + name + '.*', $options: 'i' } },
                ]
            });
            let users = [];
            for (let i = 0; i < userMatch.length; i++) {
                let user = userMatch[i];
                if (user._id == id)
                    continue;
                let isFollowed = yield follows_model_1.default.findOne({ user: id, followed: user._id });
                users.push({
                    _id: user._id,
                    username: user.username,
                    fullname: user.fullname,
                    profileImg: user.profileImg,
                    followed: isFollowed != null
                });
            }
            res.send(users);
        });
    }
    notFollowed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            let followed = yield follows_model_1.default.find({ user: _id });
            let followedClean = [_id];
            followed.forEach((follow) => {
                followedClean.push(follow.followed);
            });
            let notFollowed = yield user_model_1.default.find({ _id: { $nin: followedClean } }).select('fullname username profileImg');
            res.send(notFollowed);
        });
    }
}
exports.followController = new FollowController();
