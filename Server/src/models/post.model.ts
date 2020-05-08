import mongoose, {Schema, Document} from 'mongoose';
import {IUser} from './user.model';

export interface IPost extends Document{
    user_id : IUser['_id'],
    creationDate : Date,
    type : number,
    text : string,
    img : string
}

const PostSchema : Schema = new Schema({
    user_id : {type : Schema.Types.ObjectId, ref : 'User', required : true},
    creationDate : {type : Date, default : Date.now},
    type : {type : Number, enum : [0,1,2], default : 0},
    text : {type : String},
    img : {type : String},
});

export default mongoose.model<IPost>('Post',PostSchema);
