"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testeRouter = void 0;
const express_1 = __importDefault(require("express"));
const apiAdapter_1 = require("../apiAdapter");
const testeRouter = express_1.default.Router();
exports.testeRouter = testeRouter;
const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = (0, apiAdapter_1.apiAdapter)(BASE_URL);
testeRouter.post('/aluno/agenda/desafios/', (req, res) => {
    gymapp_api.post(`/aluno/agenda/desafios/`).then(resp => {
        res.send(resp.data);
    });
});
//# sourceMappingURL=teste.js.map