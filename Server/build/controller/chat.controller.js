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
const chat_model_1 = __importDefault(require("../models/chat.model"));
const mongoose_1 = __importDefault(require("mongoose"));
class ChatController {
    constructor() { }
    getMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user1, user2 } = req.params;
            console.log(user1);
            console.log(user2);
            let chat = yield chat_model_1.default.findOne({ $or: [
                    { user1: user1, user2: user2 },
                    { user1: user2, user2: user1 }
                ] })
                .populate([
                { path: 'user1', select: 'username fullname profileImg' },
                { path: 'user2', select: 'username fullname profileImg' },
                { path: 'messages.emisor', select: 'username fullname profileImg' }
            ]);
            if (chat == null) {
                yield chat_model_1.default.create({ user1: mongoose_1.default.Types.ObjectId(user1), user2: mongoose_1.default.Types.ObjectId(user2), messages: [] });
                chat = yield chat_model_1.default.findOne({ $or: [
                        { user1: user1, user2: user2 },
                        { user1: user2, user2: user1 }
                    ] }).populate([{ path: 'user1', select: 'username fullname profileImg' }, { path: 'user2', select: 'username fullname profileImg' }]);
                res.json(chat);
            }
            else {
                res.json(chat);
            }
        });
    }
    newMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { emisor, receptor, message } = req.body;
            let newMsg = {
                text: message,
                emisor: mongoose_1.default.Types.ObjectId(emisor)
            };
            let data = yield chat_model_1.default.updateOne({
                $or: [
                    { user1: emisor, user2: receptor },
                    { user1: receptor, user2: emisor }
                ]
            }, { $push: { messages: newMsg } });
            res.json(data);
        });
    }
}
exports.chatController = new ChatController();
