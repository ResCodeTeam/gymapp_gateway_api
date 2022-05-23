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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarRefreshToken = void 0;
require('dotenv').config({ path: __dirname + '/.env' });
const jsonwebtoken_1 = require("jsonwebtoken");
const client_1 = require("../prisma/client");
function verificarRefreshToken(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.body.refresh_token === undefined) {
            response.json({ 'msg': 'Token invalido' }).status(401);
        }
        const user = yield client_1.client.users.findFirst({
            where: {
                refresh_token: request.body.refresh_token
            }
        });
        const refreshToken = user.refresh_token;
        if (!refreshToken) {
            response.json({ 'msg': 'Sessão invalida' }).status(401);
        }
        try {
            (0, jsonwebtoken_1.verify)(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
        }
        catch (e) {
            response.json({ 'msg': 'Sessão invalida' }).status(401);
        }
        next();
    });
}
exports.verificarRefreshToken = verificarRefreshToken;
//# sourceMappingURL=verificarRefreshToken.js.map