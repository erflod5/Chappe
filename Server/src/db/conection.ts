import mongoose from 'mongoose';
import keyMongo from '../keys/key';

class Database{
    constructor(){
        this._connect();
    }

    _connect(){
        //mongoose.connect(`mongodb://erflod5:1234@${keyMongo.server}/${keyMongo.database}`,{useNewUrlParser : true,useUnifiedTopology: true});
        mongoose.connect(`mongodb://${keyMongo.server}/${keyMongo.database}`,{useNewUrlParser : true,useUnifiedTopology: true});
        mongoose.set('useCreateIndex',true);
        mongoose.connection.on('open',()=>{
          console.log('Database connection successful')
        });
    }
}

module.exports = new Database();