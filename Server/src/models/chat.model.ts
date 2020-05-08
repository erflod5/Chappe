import mongoose, {Schema, Document} from 'mongoose';
import {IUser} from './user.model';

export interface IChat extends Document{
    user1 : IUser['_id'],
    user2 : IUser['_id'],
    messages : [{ emisor : IUser['_id'], message : string, date : Date}]
}

const ChatSchema : Schema = new Schema({
    user1 : {type : Schema.Types.ObjectId, ref : 'User'},
    user2 : {type : Schema.Types.ObjectId, ref : 'User'},
    messages : [ 
        { 
            emisor : {type : Schema.Types.ObjectId, ref : 'User'}, 
            text : {type : String},
            date : {type : Date, default : Date.now}
        }
    ]
});

export default mongoose.model<IChat>('Chat',ChatSchema);