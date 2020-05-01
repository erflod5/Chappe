"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controller/post.controller");
class PostRoute {
    constructor() {
        this.router = express_1.Router();
        this._config();
    }
    _config() {
        this.router.get('/', post_controller_1.postController.read);
        this.router.post('/', post_controller_1.postController.create);
    }
}
const postRoute = new PostRoute();
exports.default = postRoute.router;
