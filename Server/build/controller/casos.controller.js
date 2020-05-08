"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const casos_model_1 = __importDefault(require("../models/casos.model"));
class CasosController {
    constructor() { }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            yield casos_model_1.default.create(body)
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((err) => {
                res.status(200).send({});
            });
        });
    }
    insertMany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let json = req.body;
            let arrayCasos = [];
            for (let key in json) {
                arrayCasos.push({
                    pais: key,
                    casos: json[key]
                });
            }
            let status = yield casos_model_1.default.insertMany(arrayCasos);
            res.send(status);
        });
    }
    readOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            const caso = yield casos_model_1.default.findById(_id);
            res.status(200).json(caso);
        });
    }
    readMany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const casos = yield casos_model_1.default.find({});
            res.status(200).json(casos);
        });
    }
    getCasos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { pais, fecha, tipo } = req.body;
            let casos = yield casos_model_1.default.findOne({ pais: pais, 'casos.date': fecha, }, { _id: 0, 'casos.$': 1 });
            console.log(casos);
            res.send({ confirmed: casos === null || casos === void 0 ? void 0 : casos.casos[0].confirmed, deaths: casos === null || casos === void 0 ? void 0 : casos.casos[0].deaths, recoverd: casos === null || casos === void 0 ? void 0 : casos.casos[0].recovered });
        });
    }
    getGraph(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { pais, fechaI, fechaF } = req.body;
            fechaI = new Date(fechaI);
            fechaF = new Date(fechaF);
            let casos = yield casos_model_1.default.findOne({ pais: pais });
            let cleanCasos = [];
            casos === null || casos === void 0 ? void 0 : casos.casos.forEach((caso) => {
                if (caso.date <= fechaF && caso.date >= fechaI) {
                    cleanCasos.push(caso);
                }
            });
            res.send(cleanCasos);
        });
    }
}
exports.casosController = new CasosController();
