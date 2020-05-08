import {Router} from 'express';
import {followController} from '../controller/follows.controller';

class FollowRoute{
    router : Router;

    constructor(){
        this.router = Router();
        this._config();
    }

    _config() : void {
        this.router.post('/new',followController.newFollowed);
        this.router.post('/lost',followController.lostFollowed);
        this.router.get('/followed/:_id',followController.getFollowed);
        this.router.get('/mutual/:_id',followController.mutualFollow);
        this.router.post('/find',followController.findUser);
        this.router.get('/notFollowed/:_id',followController.notFollowed);
    }
}

const followRoute = new FollowRoute();
export default followRoute.router;