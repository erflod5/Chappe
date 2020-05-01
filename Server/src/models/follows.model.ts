import mongoose, {Schema, Document} from 'mongoose';
import {IUser} from './user.model';

export interface IFollow extends Document{
    user : IUser['_id'],
    followed : IUser['_id']
}

const FollowSchema : Schema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : 'User', required : true},
    followed : {type : Schema.Types.ObjectId, ref : 'User'}
});

export default mongoose.model<IFollow>('Follow',FollowSchema);