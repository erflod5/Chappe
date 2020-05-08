"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("../controller/chat.controller");
class ChatRoute {
    constructor() {
        this.router = express_1.Router();
        this._config();
    }
    _config() {
        this.router.get('/:user1/:user2', chat_controller_1.chatController.getMessage);
        this.router.post('/', chat_controller_1.chatController.newMessage);
    }
}
const chatRoute = new ChatRoute();
exports.default = chatRoute.router;
