import mongoose, {Schema, Document} from 'mongoose';

export interface IUser extends Document{
    fullname : string,
    username : string,
    password : string,
    profileImg : string
}

const UserSchema : Schema = new Schema({
    username : {type : String, required : true, unique : true},
    fullname : {type : String, required : true},
    password : {type : String, select : false, required : true},
    profileImg : {type : String, required : true} 
});

export default mongoose.model<IUser>('User',UserSchema);