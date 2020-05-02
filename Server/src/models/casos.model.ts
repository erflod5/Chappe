import mongoose, {Schema, Document} from 'mongoose';

export interface ICasos extends Document{
    pais : string,
    casos : [{date : Date, confirmed : number, deaths : number, recoverd : number}]
}

const CasosSchema : Schema = new Schema({
    pais : {type : String},
    casos : [
        {
            date : {type : Date},
            confirmed : {type : Number},
            deaths : {type : Number},
            recoverd : {type : Number}
        }
    ]
});

export default mongoose.model<ICasos>('Casos',CasosSchema);