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
const user_model_1 = __importDefault(require("../models/user.model"));
const sha1_1 = __importDefault(require("sha1"));
const AWS = __importStar(require("aws-sdk"));
const uuid_1 = require("uuid");
const aws_1 = __importDefault(require("../keys/aws"));
var s3 = new AWS.S3(aws_1.default.s3);
class UserController {
    constructor() {
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            body.password = sha1_1.default(body.password);
            let base64 = body.profileImg.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            let decodedImage = Buffer.from(base64[2], 'base64');
            let extension = base64[1].split('/')[1];
            let filename = `${body.username}-${uuid_1.v4()}.${extension}`;
            let bucketName = 'usocial';
            let folder = 'users/';
            let filepath = `${folder}${filename}`;
            let uploadParams = {
                Bucket: bucketName,
                Key: filepath,
                Body: decodedImage,
                ACL: 'public-read'
            };
            let s3Url = yield s3.upload(uploadParams).promise();
            console.log(s3Url);
            body.profileImg = s3Url.Location;
            console.log(body);
            yield user_model_1.default.create(body)
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((err) => {
                res.status(200).send({});
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            const body = req.body;
            let user = yield user_model_1.default.findOne({ _id: _id, password: sha1_1.default(body.password) });
            if (!user) {
                console.log("password incorrecta");
                res.status(200).send({ status: false });
            }
            else {
                try {
                    if (body.profileImg) {
                        let base64 = body.profileImg.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                        let decodedImage = Buffer.from(base64[2], 'base64');
                        let extension = base64[1].split('/')[1];
                        let filename = `${_id}-${uuid_1.v4()}.${extension}`;
                        let bucketName = 'usocial';
                        let folder = 'users/';
                        let filepath = `${folder}${filename}`;
                        let uploadParams = {
                            Bucket: bucketName,
                            Key: filepath,
                            Body: decodedImage,
                            ACL: 'public-read'
                        };
                        let s3Url = yield s3.upload(uploadParams).promise();
                        console.log(s3Url);
                        body.profileImg = s3Url.Location;
                    }
                }
                catch (error) {
                    console.log(error);
                }
                let newUser = {
                    username: body.username == undefined ? user === null || user === void 0 ? void 0 : user.username : body.username,
                    fullname: body.fullname == undefined ? user === null || user === void 0 ? void 0 : user.fullname : body.fullname,
                    profileImg: body.profileImg == undefined ? user === null || user === void 0 ? void 0 : user.profileImg : body.profileImg,
                    covidBot: body.covidBot == undefined ? user.covidBot : body.covidBot
                };
                console.log(newUser);
                user_model_1.default.updateOne({ _id }, newUser)
                    .then(() => {
                    res.status(200).json(newUser);
                })
                    .catch((err) => {
                    console.log(err);
                    res.status(200).json({ status: false });
                });
            }
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            yield user_model_1.default.deleteOne({ _id })
                .then((docs) => {
                if (docs) {
                    res.json({ status: true });
                }
                else {
                    res.json({ status: false });
                }
            })
                .catch((err) => {
                console.log(err);
                res.json({ status: false });
            });
        });
    }
    readOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            const user = yield user_model_1.default.findById(_id);
            res.status(200).json(user);
        });
    }
    readMany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.default.find({}).select('username fullname profileImg covidBot').exec();
            //const users = await User.find({},{'_id' : 0}).select('username fullname profileImg').exec();
            res.status(200).json(users);
        });
    }
}
exports.userController = new UserController();
