import mongoose, {Schema, Document} from 'mongoose';
import {IUser} from './user.model';

export interface IFriends extends Document{
    user : IUser['_id'],
    followed : IUser['_id']
}

const FriendsSchema : Schema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : 'User', required : true},
    followed : {type : Schema.Types.ObjectId, ref : 'User'}
});

export default mongoose.model<IFriends>('Friends',FriendsSchema);