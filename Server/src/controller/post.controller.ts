import {Request, Response} from 'express';
import Post from '../models/post.model';
import mongoose from 'mongoose';

import * as AWS from 'aws-sdk';
import {v4 as uuid} from 'uuid';
import aws_keys from '../keys/aws';
var s3 = new AWS.S3(aws_keys.s3);

class PostController{

    constructor(){

    }

    public async read(req : Request, res : Response){
        const posts = await Post.find({},{'_id' : 0}).populate({path : 'user_id', select : 'username fullname profileImg -_id'}).sort('-creationDate');
        let actualPost : Array<any> = [];
        posts.forEach((post)=>{
            actualPost.push({
                type : post.type,
                user_id : post.user_id,
                img : post.img,
                text : post.text,
                creationDate : post.creationDate.toLocaleString("en-GB")
            });
        });
        res.status(200).json(actualPost);
    }

    public async create(req : Request, res : Response){
        let data = req.body;
        data.user_id = new mongoose.Types.ObjectId(data.user_id);

        if(data.img){
            let base64 = data.img.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            let decodedImage = Buffer.from(base64[2],'base64');
            let extension = base64[1].split('/')[1];
            let filename = `${data.user_id}-${uuid()}.${extension}`;
            let bucketName = 'usocial';
            let folder = 'posts/';
            let filepath = `${folder}${filename}`;
            
            let uploadParams = {
                Bucket : bucketName,
                Key : filepath,
                Body : decodedImage,
                ACL : 'public-read'
            }

            let s3Url = await s3.upload(uploadParams).promise();
            console.log(s3Url);
            data.img = s3Url.Location;
        }

        const post = await Post.create(data)
        .then((data)=>{
            res.status(200).json(data);
        })
        .catch((err)=>{
            console.log(err);
            res.status(200).json({status : false});
        });
    }

}

export const postController = new PostController();