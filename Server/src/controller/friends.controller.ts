import {Request, Response} from 'express';
import Friends from "../models/friends.model";
import mongoose from 'mongoose';

class FriendsController{
    constructor(){

    }

    public async newFriend(req: Request, res: Response){
        const {user, followed} = req.body;
        let newFollowed = await Friends.create({user : new mongoose.Types.ObjectId(user),followed : new mongoose.Types.ObjectId(followed)});
        res.json(newFollowed);
    }

    public async deleteFriend(req: Request, res: Response){
        const {user, friend} = req.body;
        let unfollowed = await Friends.deleteOne({user : user, followed : friend});
        if(unfollowed){
            res.json({status : true});
        }
        else{
            res.json({status : false});
        }
    }

    public async getFriends(req: Request, res: Response){
        const {user} = req.params;
        const friends = await Friends.find({user : user}).populate({
            path : 'followed',
            select : 'fullname username profileImg'
        });
        res.send(friends);
    }

    public async mutualFriend(req: Request, res: Response){
        const {user} = req.params;
        const friends = await Friends.find({user : user}).select('followed -_id');
        const mutualFriends = await Friends.find({user : {$in : friends}, followed : user}).populate([{path : 'followed'},{path : 'user'}]);
        res.json(mutualFriends);
    }
    
}

export const friendsController = new FriendsController();
