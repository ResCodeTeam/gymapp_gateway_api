"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminTreinadorRouter = void 0;
const express_1 = __importDefault(require("express"));
const apiAdapter_1 = require("../apiAdapter");
const adminTreinadorRouter = express_1.default.Router();
exports.adminTreinadorRouter = adminTreinadorRouter;
const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = (0, apiAdapter_1.apiAdapter)(BASE_URL);
adminTreinadorRouter.post('/adminTreinador/ginasio/{ginasioId}/desafio/', (req, res) => {
    gymapp_api.post(`/adminTreinador/ginasio/{ginasioId}/desafio/`).then(resp => {
        res.send(resp.data);
    });
});
adminTreinadorRouter.delete('/adminTreinador/desafio/{desafioId}', (req, res) => {
    gymapp_api.delete(`/adminTreinador/desafio/{desafioId}`).then(resp => {
        res.send(resp.data);
    });
});
adminTreinadorRouter.put('/adminTreinador/desafio/{desafioId}', (req, res) => {
    gymapp_api.put(`/adminTreinador/desafio/{desafioId}`).then(resp => {
        res.send(resp.data);
    });
});
adminTreinadorRouter.put('/adminTreinador/desafio/{desafioId}/editar', (req, res) => {
    gymapp_api.put(`/adminTreinador/desafio/{desafioId}/editar`).then(resp => {
        res.send(resp.data);
    });
});
adminTreinadorRouter.get('/adminTreinador/musculos/', (req, res) => {
    gymapp_api.get(`/adminTreinador/musculos/`).then(resp => {
        res.send(resp.data);
    });
});
//# sourceMappingURL=adminTreinador.js.map