//Libs
import express from 'express';
import cors from 'cors';
import './db/conection';
import UserRoute from './routes/user.route';
import PostRoute from './routes/post.route';
import LoginRoute from './routes/login.route';
import FollowRoute from './routes/follows.route';
import ChatRoute from './routes/chat.route';

//Init
const app = express();

//Settings
app.set('port',process.env.PORT || 3000);
app.use(cors());
app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({extended : true, limit : '50mb'}));

//Routes
app.use('/api/user',UserRoute);
app.use('/api/post',PostRoute);
app.use('/api/login',LoginRoute);
app.use('/api/follow',FollowRoute);
app.use('/api/chat',ChatRoute);

app.listen(app.get('port'),()=>{
    console.log(`App listening on port ${app.get('port')}`);
});
