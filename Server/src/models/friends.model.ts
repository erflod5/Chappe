import mongoose, {Schema, Document} from 'mongoose';
import {IUser} from './user.model';

export interface IFriends extends Document{
    user : IUser['_id'],
    friends : [IUser['_id']]
}

const FriendsSchema : Schema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : 'User', required : true},
    friends : [{type : Schema.Types.ObjectId, ref : 'User'}]
});

export default mongoose.model<IFriends>('Friends',FriendsSchema);