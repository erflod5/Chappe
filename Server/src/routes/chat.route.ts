import {Router} from 'express';
import {chatController} from '../controller/chat.controller';

class ChatRoute{
    router : Router;

    constructor(){
        this.router = Router();
        this._config();
    }

    _config() : void {
        this.router.get('/:user1/:user2',chatController.getMessage);
        this.router.post('/',chatController.newMessage);
    }
}

const chatRoute = new ChatRoute();
export default chatRoute.router;