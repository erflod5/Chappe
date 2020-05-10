"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const key_1 = __importDefault(require("../keys/key"));
class Database {
    constructor() {
        this._connect();
    }
    _connect() {
        //mongoose.connect(`mongodb://erflod5:1234@${keyMongo.server}/${keyMongo.database}`,{useNewUrlParser : true,useUnifiedTopology: true});
        console.log(key_1.default);
        mongoose_1.default.connect(`mongodb://${key_1.default.user}:${key_1.default.pass}@${key_1.default.server}/${key_1.default.database}`, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose_1.default.set('useCreateIndex', true);
        mongoose_1.default.connection.on('open', () => {
            console.log('Database connection successful');
        });
    }
}
module.exports = new Database();
