import {Request, Response} from 'express';
import Chat from '../models/chat.model';
import mongoose from 'mongoose';

class ChatController{

    constructor(){}

    public async getMessage(req: Request, res: Response){
        const {user1, user2} = req.params;
        console.log(user1);
        console.log(user2);
        let chat = await Chat.findOne(
            {$or : [
                {user1 : user1, user2 : user2}, 
                {user1 : user2, user2 : user1}
            ]})
            .populate([
                {path : 'user1',select : 'username fullname profileImg'},
                {path : 'user2',select : 'username fullname profileImg'},
                {path : 'messages.emisor', select : 'username fullname profileImg'}
            ]);
        
        if(chat == null){
            await Chat.create({user1 : mongoose.Types.ObjectId(user1),user2 : mongoose.Types.ObjectId(user2),messages : []})
            chat = await Chat.findOne({$or : 
                [
                    {user1 : user1, user2 : user2}, 
                    {user1 : user2, user2 : user1}
                ]}).populate([{path : 'user1',select : 'username fullname profileImg'},{path : 'user2',select : 'username fullname profileImg'}]);
            res.json(chat);
        }
        else{
            res.json(chat);
        }
    }

    public async newMessage(req: Request, res: Response){
        const {emisor, receptor, message} = req.body;

        let newMsg = {
            text : message,
            emisor : mongoose.Types.ObjectId(emisor)
        }

        let data = await Chat.updateOne({
            $or : [
                {user1 : emisor, user2 : receptor}, 
                {user1 : receptor, user2 : emisor}
            ]},{$push : {messages : newMsg}});
        res.json(data);
    }
}

export const chatController = new ChatController();
