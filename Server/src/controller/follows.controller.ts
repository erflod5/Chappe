import {Request, Response} from 'express';
import Follow from "../models/follows.model";
import User from '../models/user.model';
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
    
    public async findUser(req: Request, res: Response){
        const {id,name} = req.body;
        let userMatch = await User.find({
            $or : [
                {fullname :  { $regex : name, $options: 'i'}},
                {fullname : { $regex: '.*' + name + '.*', $options: 'i' }},
            ]
        });
        let users : Array<any> = [];
        for(let i = 0; i < userMatch.length; i++){
            let user = userMatch[i];
            if(user._id == id)
                continue;
            let isFollowed = await Follow.findOne({user : id, followed : user._id});
            users.push({
                _id : user._id,
                username : user.username,
                fullname : user.fullname,
                profileImg : user.profileImg,
                followed : isFollowed != null
            });
            console.log(isFollowed);
        }
        res.send(users);
    }

    public async notFollowed(req: Request, res: Response){
        const {_id} = req.params;
        let followed = await Follow.find({user : _id});
        let followedClean : any = [_id];
        followed.forEach((follow)=>{
            followedClean.push(follow.followed);
        });
        let notFollowed = await User.find({_id : {$nin: followedClean}}).select('fullname username profileImg');
        res.send(notFollowed);
    }
}

export const followController = new FollowController();
