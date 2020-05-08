"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Libs
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
require("./db/conection");
const user_route_1 = __importDefault(require("./routes/user.route"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const login_route_1 = __importDefault(require("./routes/login.route"));
const follows_route_1 = __importDefault(require("./routes/follows.route"));
const chat_route_1 = __importDefault(require("./routes/chat.route"));
const chat_model_1 = __importDefault(require("./models/chat.model"));
const casos_route_1 = __importDefault(require("./routes/casos.route"));
//Init
const app = express_1.default();
const server = http_1.default.createServer(app);
const io = socket_io_1.default(server);
//Settings
app.set('port', process.env.PORT || 3000);
app.use(cors_1.default());
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
//Routes
app.use('/api/user', user_route_1.default);
app.use('/api/post', post_route_1.default);
app.use('/api/login', login_route_1.default);
app.use('/api/follow', follows_route_1.default);
app.use('/api/chat', chat_route_1.default);
app.use('/api/casos', casos_route_1.default);
//Running Server
server.listen(app.get('port'), () => {
    console.log(`App listening on port ${app.get('port')}`);
});
//Socket
let users = [];
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("message", function (message) {
        console.log('message: ', message);
        if (users[message.to] != null && users[message.to] != undefined) {
            console.log("yes");
            users[message.to].forEach((user) => {
                console.log("Yes again", user);
                io.to(user).emit('message', message);
            });
        }
        saveMsg(message.from, message.to, message.text);
    });
    socket.on('handshake', (user) => {
        console.log('Handshake: ', user);
        if (users[user] === undefined || users[user] === null) {
            users[user] = [];
        }
        users[user][0] = socket.id;
        console.log(users);
    });
    socket.on('disconnect', (user) => {
        console.log('user disconnected: ', user);
    });
});
function saveMsg(emisor, receptor, text) {
    chat_model_1.default.updateOne({ $or: [{ user1: emisor, user2: receptor }, { user1: receptor, user2: emisor }] }, { $push: { messages: { emisor: emisor, text: text } } }).then((data) => {
        console.log("SaveMsg: ", data);
    }).catch((err) => {
        console.error("ErrorMsg: ", err);
    });
}
