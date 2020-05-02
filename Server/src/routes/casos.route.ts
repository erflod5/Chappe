import {Router} from 'express';
import {casosController} from '../controller/casos.controller';

class ChatRoute{
    router : Router;

    constructor(){
        this.router = Router();
        this._config();
    }

    _config() : void {
        this.router.post('/',casosController.insertMany);
        this.router.get('/',casosController.readMany);
        this.router.get('/:_id',casosController.readOne);
    }
}

const chatRoute = new ChatRoute();
export default chatRoute.router;