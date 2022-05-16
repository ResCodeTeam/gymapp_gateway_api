"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const apiAdapter_1 = require("../apiAdapter");
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = (0, apiAdapter_1.apiAdapter)(BASE_URL);
authRouter.post('/auth/login', (req, res) => {
    gymapp_api.post(`/auth/login`).then(resp => {
        res.send(resp.data);
    });
});
authRouter.post('/auth/{id}/token', (req, res) => {
    gymapp_api.post(`/auth/{id}/token`).then(resp => {
        res.send(resp.data);
    });
});
authRouter.delete('/auth/logout', (req, res) => {
    gymapp_api.delete(`/auth/logout`).then(resp => {
        res.send(resp.data);
    });
});
//# sourceMappingURL=auth.js.map