import {Router} from 'express';
import {userController} from '../controller/user.controller';

class UserRoute{
    router : Router;

    constructor(){
        this.router = Router();
        this._config();
    }

    _config() : void {
        this.router.get('/:_id',userController.readOne);
        this.router.post('/',userController.create);
        this.router.put('/:_id',userController.update);
        this.router.delete('/:_id',userController.remove);
        this.router.get('/',userController.readMany);
        this.router.get('/friends/:_id',userController.readFriends);
    }
}

const userRoute = new UserRoute();
export default userRoute.router;