"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const casos_controller_1 = require("../controller/casos.controller");
class ChatRoute {
    constructor() {
        this.router = express_1.Router();
        this._config();
    }
    _config() {
        this.router.post('/', casos_controller_1.casosController.insertMany);
        this.router.get('/', casos_controller_1.casosController.readMany);
        this.router.get('/:_id', casos_controller_1.casosController.readOne);
        this.router.post('/casos', casos_controller_1.casosController.getCasos);
        this.router.post('/graph', casos_controller_1.casosController.getGraph);
    }
}
const chatRoute = new ChatRoute();
exports.default = chatRoute.router;
