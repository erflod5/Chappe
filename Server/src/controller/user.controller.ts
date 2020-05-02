import {Request, Response} from 'express';
import User from '../models/user.model';
import mongoose from 'mongoose';
import sha1 from 'sha1';
import * as AWS from 'aws-sdk';
import {v4 as uuid} from 'uuid';
import aws_keys from '../keys/aws';
var s3 = new AWS.S3(aws_keys.s3);

class UserController{


    constructor(){  

    }

    public async create(req: Request, res: Response){
        let body = req.body;
        body.password = sha1(body.password);
        let base64 = body.profileImg.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let decodedImage = Buffer.from(base64[2],'base64');
        let extension = base64[1].split('/')[1];
        let filename = `${body.username}-${uuid()}.${extension}`;
        let bucketName = 'usocial';
        let folder = 'users/';
        let filepath = `${folder}${filename}`;
        
        let uploadParams = {
            Bucket : bucketName,
            Key : filepath,
            Body : decodedImage,
            ACL : 'public-read'
        }

        let s3Url = await s3.upload(uploadParams).promise();
        console.log(s3Url);

        body.profileImg = s3Url.Location;
        console.log(body);
        await User.create(body)
            .then((data)=>{
                res.status(200).json(data);
            })
            .catch((err)=>{
                res.status(200).send({});
            });
    }

    public async update(req: Request, res: Response){
        const {_id} = req.params;
        const body = req.body;
        //const user = await User.findOne({username : body.username, password : sha1(body.password)});
        let user = await User.findOne({_id : _id, password : sha1(body.password)});
        if(!user){
            console.log("password incorrecta");
            res.status(200).send({status : false});
        }
        else{
            try {
                if(body.profileImg){
                    let base64 = body.profileImg.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                    let decodedImage = Buffer.from(base64[2],'base64');
                    let extension = base64[1].split('/')[1];
                    let filename = `${_id}-${uuid()}.${extension}`;
                    let bucketName = 'usocial';
                    let folder = 'users/';
                    let filepath = `${folder}${filename}`;
                    
                    let uploadParams = {
                        Bucket : bucketName,
                        Key : filepath,
                        Body : decodedImage,
                        ACL : 'public-read'
                    }
            
                    let s3Url = await s3.upload(uploadParams).promise();
                    console.log(s3Url);
            
                    body.profileImg = s3Url.Location;
                }   
            } catch (error) {
                console.log(error);
            }
            let newUser = {
                username : body.username  == undefined ? user?.username : body.username,
                fullname : body.fullname == undefined ? user?.fullname : body.fullname,
                profileImg : body.profileImg == undefined ? user?.profileImg : body.profileImg  
            };
            console.log(newUser);
            User.updateOne({_id},newUser)
                .then(()=>{
                    res.status(200).json(newUser);
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(200).json({status : false});
                })
        }
    }

    public async remove(req: Request, res: Response){
        const {_id} = req.params;
        await User.deleteOne({_id})
        .then((docs)=>{
            if(docs){
                res.json({status : true});
            }
            else{
                res.json({status : false});
            }
        })
        .catch((err)=>{
            console.log(err);
            res.json({status : false});            
        });
    }

    public async readOne(req: Request, res: Response){
        const {_id} = req.params;
        const user = await User.findById(_id);
        res.status(200).json(user);
    }

    public async readMany(req: Request, res: Response){
        const users = await User.find({}).select('username fullname profileImg').exec();
        //const users = await User.find({},{'_id' : 0}).select('username fullname profileImg').exec();
        res.status(200).json(users);
    }

    /*public async readFollowed(req: Request, res: Response){
        const {_id} = req.params;
        const obId = new mongoose.Types.ObjectId(_id);
        console.log(obId);

        const users = await User.find({_id : {$ne : obId}},{'_id' : 0}).select('username fullname profileImg').exec();
        res.status(200).json(users);
    }*/
}

export const userController = new UserController();