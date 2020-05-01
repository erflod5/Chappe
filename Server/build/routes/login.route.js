"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = require("../controller/login.controller");
class LoginRoute {
    constructor() {
        this.router = express_1.Router();
        this._config();
    }
    _config() {
        this.router.post('/', login_controller_1.loginController.login);
    }
}
const loginRoute = new LoginRoute();
exports.default = loginRoute.router;
