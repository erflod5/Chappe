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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = __importDefault(require("../models/post.model"));
const follows_model_1 = __importDefault(require("../models/follows.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const AWS = __importStar(require("aws-sdk"));
const uuid_1 = require("uuid");
const aws_1 = __importDefault(require("../keys/aws"));
const s3 = new AWS.S3(aws_1.default.s3);
const translate = new AWS.Translate(aws_1.default.translate);
class PostController {
    constructor() { }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { _id } = req.params;
            let followed = yield follows_model_1.default.find({ user: _id });
            let follows_clean = [];
            followed.forEach((follow) => {
                follows_clean.push(follow.followed);
            });
            follows_clean.push(_id);
            const posts = yield post_model_1.default.find({ user_id: { $in: follows_clean } }, { '_id': 0 }).populate({ path: 'user_id', select: 'username fullname profileImg -_id' }).sort('-creationDate');
            let actualPost = [];
            posts.forEach((post) => {
                actualPost.push({
                    type: post.type,
                    user_id: post.user_id,
                    img: post.img,
                    text: post.text,
                    creationDate: post.creationDate.toLocaleString("en-GB")
                });
            });
            res.status(200).json(actualPost);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = req.body;
            data.user_id = new mongoose_1.default.Types.ObjectId(data.user_id);
            if (data.img) {
                let base64 = data.img.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                let decodedImage = Buffer.from(base64[2], 'base64');
                let extension = base64[1].split('/')[1];
                let filename = `${data.user_id}-${uuid_1.v4()}.${extension}`;
                let bucketName = 'usocial';
                let folder = 'posts/';
                let filepath = `${folder}${filename}`;
                let uploadParams = {
                    Bucket: bucketName,
                    Key: filepath,
                    Body: decodedImage,
                    ACL: 'public-read'
                };
                let s3Url = yield s3.upload(uploadParams).promise();
                console.log(s3Url);
                data.img = s3Url.Location;
            }
            const post = yield post_model_1.default.create(data)
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((err) => {
                console.log(err);
                res.status(200).json({ status: false });
            });
        });
    }
    translate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { text } = req.body;
            let params = {
                SourceLanguageCode: 'auto',
                TargetLanguageCode: 'es',
                Text: text || 'Nothing here'
            };
            let data = yield translate.translateText(params).promise();
            res.json({ translate: data.TranslatedText });
        });
    }
}
exports.postController = new PostController();
