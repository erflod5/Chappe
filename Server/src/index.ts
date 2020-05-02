//Libs
import express from 'express';
import cors from 'cors';
import http from 'http';
import socketIo from 'socket.io';
import './db/conection';
import UserRoute from './routes/user.route';
import PostRoute from './routes/post.route';
import LoginRoute from './routes/login.route';
import FollowRoute from './routes/follows.route';
import ChatRoute from './routes/chat.route';
import Chat from './models/chat.model';
import CasosRoute from './routes/casos.route';

//Init
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

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
app.use('/api/casos',CasosRoute);

//Running Server
server.listen(app.get('port'),()=>{
    console.log(`App listening on port ${app.get('port')}`);
});

//Socket
let users : Array<Array<string>> = [];

io.on('connectionc',(socket : any)=>{
    console.log('a user connected');
    socket.on("message", function(message: any) {
        console.log(message);
        if(users[message.to] != null && users[message.to] != undefined){
            users[message.to].forEach((user)=>{
                io.to(user).emit(message);
            });
        }
        saveMsg(message.from,message.to,message.text);
      });

    socket.on('handshake',(user:any)=>{
        console.log(user);
        if(users[user] === undefined || users[user] === null){
            users[user] = [];
        }
        users[user].push(socket.id);
    });
});


function saveMsg(emisor : string, receptor : string, text : string){
    Chat.updateOne(
        { $or : [{ user1 : emisor, user2 : receptor}, {user1 : receptor, user2 : emisor}]},
        {$push : {messages : {emisor : emisor, text : text}}}
    ).then((data)=>{
        console.log("SaveMsg: ",data);
    }).catch((err)=>{
        console.error("ErrorMsg: ",err);
    });
}