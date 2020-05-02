"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const follows_controller_1 = require("../controller/follows.controller");
class FollowRoute {
    constructor() {
        this.router = express_1.Router();
        this._config();
    }
    _config() {
        this.router.post('/new', follows_controller_1.followController.newFollowed);
        this.router.post('/lost', follows_controller_1.followController.lostFollowed);
        this.router.get('/followed/:_id', follows_controller_1.followController.getFollowed);
        this.router.get('/mutual/:_id', follows_controller_1.followController.mutualFollow);
        this.router.post('/find', follows_controller_1.followController.findUser);
        this.router.get('/notFollowed/:_id', follows_controller_1.followController.notFollowed);
    }
}
const followRoute = new FollowRoute();
exports.default = followRoute.router;
