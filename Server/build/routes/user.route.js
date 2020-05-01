"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
class UserRoute {
    constructor() {
        this.router = express_1.Router();
        this._config();
    }
    _config() {
        this.router.get('/:_id', user_controller_1.userController.readOne);
        this.router.post('/', user_controller_1.userController.create);
        this.router.put('/:_id', user_controller_1.userController.update);
        this.router.delete('/:_id', user_controller_1.userController.remove);
        this.router.get('/', user_controller_1.userController.readMany);
        this.router.get('/friends/:_id', user_controller_1.userController.readFriends);
    }
}
const userRoute = new UserRoute();
exports.default = userRoute.router;
