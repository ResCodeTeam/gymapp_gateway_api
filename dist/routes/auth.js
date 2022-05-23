"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const verificarAutenticacao_1 = require("../api/middlewares/verificarAutenticacao");
const verificarRefreshToken_1 = require("../api/middlewares/verificarRefreshToken");
const apiAdapter_1 = require("../apiAdapter");
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = (0, apiAdapter_1.apiAdapter)(BASE_URL);
authRouter.post('/auth/login', (req, res) => {
    gymapp_api.post(`/auth/login`, req.body).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
authRouter.post('/auth/token', verificarRefreshToken_1.verificarRefreshToken, (req, res) => {
    gymapp_api.post(`/auth/token`, req.body).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
authRouter.delete('/auth/logout', verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api.delete(`/auth/${userId}/logout`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
//# sourceMappingURL=auth.js.map