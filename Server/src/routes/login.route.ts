import {Router} from 'express';
import {loginController} from '../controller/login.controller';

class LoginRoute{
    router : Router;

    constructor(){
        this.router = Router();
        this._config();
    }

    _config() : void {
        this.router.post('/',loginController.login);
    }
}

const loginRoute = new LoginRoute();
export default loginRoute.router;