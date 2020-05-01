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
        const {user, followed} = req.body;
        let unfollowed = await Follow.deleteOne({user : user, followed : followed});
        if(unfollowed){
            res.json({status : true});
        }
        else{
            res.json({status : false});
        }
    }

    public async getFollowed(req: Request, res: Response){
        const {_id} = req.params;
        const followed = await Follow.find({user : _id}).populate({
            path : 'followed',
            select : 'fullname username profileImg'
        });
        res.send(followed);
    }

    public async mutualFollow(req: Request, res: Response){
        const {_id} = req.params;
        const followed = await Follow.find({user : _id}).select('followed -_id');
        
        let followed_clean : any = [];
        followed.forEach((follow : any)=>{
            followed_clean.push(follow.followed);
        });

        console.log(followed_clean);
        const mutualFollow = await Follow.find({user : {$in : followed_clean}, followed : _id})
                            .populate([{path : 'user',select : 'username fullname profileImg'}]).select('user -_id');
        res.json(mutualFollow);
    }
    
}

export const followController = new FollowController();
