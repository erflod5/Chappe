import {Request, Response} from 'express';
import mongoose from 'mongoose';
import Casos from '../models/casos.model';

class CasosController{

    constructor(){  }

    public async create(req: Request, res: Response){
        let body = req.body;
        await Casos.create(body)
            .then((data)=>{
                res.status(200).json(data);
            })
            .catch((err)=>{
                res.status(200).send({});
            });
    }

    public async insertMany(req: Request, res: Response){
        let json = req.body;
        let arrayCasos : Array<any> = [];
        for(let key in json){
            arrayCasos.push({
                pais : key,
                casos : json[key]
            });
        }
        let status = await Casos.insertMany(arrayCasos);
        res.send(status);
    }

    public async readOne(req: Request, res: Response){
        const {_id} = req.params;
        const caso = await Casos.findById(_id);
        res.status(200).json(caso);
    }

    public async readMany(req: Request, res: Response){
        const casos = await Casos.find({});
        res.status(200).json(casos);
    }
}

export const casosController = new CasosController();