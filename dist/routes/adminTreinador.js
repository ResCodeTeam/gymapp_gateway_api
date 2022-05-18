"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminTreinadorRouter = void 0;
const express_1 = __importDefault(require("express"));
const verificarAdminTreinador_1 = require("../api/middlewares/verificarAdminTreinador");
const verificarAutenticacao_1 = require("../api/middlewares/verificarAutenticacao");
const apiAdapter_1 = require("../apiAdapter");
const adminTreinadorRouter = express_1.default.Router();
exports.adminTreinadorRouter = adminTreinadorRouter;
const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = (0, apiAdapter_1.apiAdapter)(BASE_URL);
adminTreinadorRouter.post('/adminTreinador/ginasio/desafio/', verificarAutenticacao_1.verificarAutenticacao, verificarAdminTreinador_1.verificarAdminTreinador, (req, res) => {
    const userId = res.locals.uid;
    const ginasioId = req.body.ginasioId;
    let body = req.body;
    delete body['ginasioId'];
    gymapp_api.post(`/adminTreinador/${userId}/ginasio/${ginasioId}/desafio/`, body).then(resp => {
        res.send(resp.data);
    });
});
adminTreinadorRouter.delete('/adminTreinador/desafio/:desafioId', verificarAutenticacao_1.verificarAutenticacao, verificarAdminTreinador_1.verificarAdminTreinador, (req, res) => {
    const userId = res.locals.uid;
    const desafioId = req.params.desafioId;
    gymapp_api.delete(`/adminTreinador/${userId}/desafio/${desafioId}`).then(resp => {
        res.send(resp.data);
    });
});
adminTreinadorRouter.put('/adminTreinador/desafio/', verificarAutenticacao_1.verificarAutenticacao, verificarAdminTreinador_1.verificarAdminTreinador, (req, res) => {
    const userId = res.locals.uid;
    const desafioId = req.body.desafioId;
    let body = req.body;
    delete body['desafioId'];
    gymapp_api.put(`/adminTreinador/${userId}/desafio/${desafioId}`, body).then(resp => {
        res.send(resp.data);
    });
});
adminTreinadorRouter.put('/adminTreinador/desafio/editar', verificarAutenticacao_1.verificarAutenticacao, verificarAdminTreinador_1.verificarAdminTreinador, (req, res) => {
    const userId = res.locals.uid;
    const desafioId = req.body.desafioId;
    let body = req.body;
    delete body['desafioId'];
    gymapp_api.put(`/adminTreinador/${userId}/desafio/${desafioId}/editar`, body).then(resp => {
        res.send(resp.data);
    });
});
adminTreinadorRouter.get('/adminTreinador/musculos/', verificarAutenticacao_1.verificarAutenticacao, verificarAdminTreinador_1.verificarAdminTreinador, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api.get(`/adminTreinador/${userId}/musculos/`).then(resp => {
        res.send(resp.data);
    });
});
//# sourceMappingURL=adminTreinador.js.map