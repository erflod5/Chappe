import {Request, Response} from 'express';
import User from '../models/user.model';
import sha1 from 'sha1';

class LoginController{
    constructor(){

    }

    public async login(req: Request, res: Response){
        let body = req.body;
        const user = await User.findOne({username : body.username, password : sha1(body.password)});
        res.status(200).json({status : user != null, user : user})
    }
}

export const loginController = new LoginController();
