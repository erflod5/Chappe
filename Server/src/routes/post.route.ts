import {Router} from 'express';
import {postController} from '../controller/post.controller';

class PostRoute{
    router : Router;

    constructor(){
        this.router = Router();
        this._config();
    }

    _config() : void {
        this.router.get('/',postController.read);
        this.router.post('/',postController.create);
    }
}

const postRoute = new PostRoute();
export default postRoute.router;