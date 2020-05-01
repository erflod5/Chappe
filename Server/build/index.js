"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Libs
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./db/conection");
const user_route_1 = __importDefault(require("./routes/user.route"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const login_route_1 = __importDefault(require("./routes/login.route"));
//Init
const app = express_1.default();
//Settings
app.set('port', process.env.PORT || 3000);
app.use(cors_1.default());
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
//Routes
app.use('/api/user', user_route_1.default);
app.use('/api/post', post_route_1.default);
app.use('/api/login', login_route_1.default);
app.listen(app.get('port'), () => {
    console.log(`App listening on port ${app.get('port')}`);
});
