import {Router} from 'express';
import {postController} from '../controller/post.controller';

class PostRoute{
    router : Router;

    constructor(){
        this.router = Router();
        this._config();
    }

    _config() : void {
        this.router.get('/:_id',postController.read);
        this.router.post('/',postController.create);
        this.router.post('/Translate',postController.translate);
    }
}

const postRoute = new PostRoute();
export default postRoute.router;