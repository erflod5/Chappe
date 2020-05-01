import {Request, Response} from 'express';
import Follow from "../models/follows.model";
import mongoose from 'mongoose';

class FollowController{
    constructor(){

    }

    public async newFollowed(req: Request, res: Response){
        const {user, followed} = req.body;
        let newFollowed = await Follow.create({user : new mongoose.Types.ObjectId(user),followed : new mongoose.Types.ObjectId(followed)});
        res.json(newFollowed);
    }

    public async lostFollowed(req: Request, res: Response){
        const {user, friend} = req.body;
        let unfollowed = await Follow.deleteOne({user : user, followed : friend});
        if(unfollowed){
            res.json({status : true});
        }
        else{
            res.json({status : false});
        }
    }

    public async getFollowed(req: Request, res: Response){
        const {user} = req.params;
        const followed = await Follow.find({user : user}).populate({
            path : 'followed',
            select : 'fullname username profileImg'
        });
        res.send(followed);
    }

    public async mutualFollow(req: Request, res: Response){
        const {user} = req.params;
        const friends = await Follow.find({user : user}).select('followed -_id');
        const mutualFollow= await Follow.find({user : {$in : friends}, followed : user}).populate([{path : 'followed'},{path : 'user'}]);
        res.json(mutualFollow);
    }
    
}

export const followController = new FollowController();
