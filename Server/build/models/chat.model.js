"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ChatSchema = new mongoose_1.Schema({
    user1: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    user2: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    messages: [
        {
            emisor: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
            text: { type: String },
            date: { type: Date, default: Date.now }
        }
    ]
});
exports.default = mongoose_1.default.model('Chat', ChatSchema);
