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
exports.verificarAutenticacao = void 0;
const dbHelpers_1 = require("../helpers/dbHelpers");
require('dotenv').config({ path: __dirname + '/.env' });
const jsonwebtoken_1 = require("jsonwebtoken");
function verificarAutenticacao(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const auth = request.headers.authorization;
        if (!auth) {
            throw new Error("Token invalido");
        }
        const [, token] = auth.split(" ");
        //verificar se o token é válido
        try {
            (0, jsonwebtoken_1.verify)(token, process.env.SECRET_KEY_TOKEN);
        }
        catch (e) {
            throw new Error("Token invalido");
        }
        const inBlackList = yield (0, dbHelpers_1.checkInBlackList)(token);
        if (inBlackList) {
            throw new Error("Token invalido");
        }
        //obter id do user
        let uid = (0, jsonwebtoken_1.decode)(token)['sub'].toString();
        response.locals.uid = uid;
        response.locals.token = token;
        //verificar se o user existe
        const user = yield (0, dbHelpers_1.getUserByID)(uid);
        if (!user) {
            throw new Error("User inexistente");
        }
        const refreshToken = user.refresh_token;
        if (!refreshToken) {
            throw new Error("Sessão invalida");
        }
        try {
            (0, jsonwebtoken_1.verify)(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
        }
        catch (e) {
            throw new Error("Sessão invalida");
        }
        next();
    });
}
exports.verificarAutenticacao = verificarAutenticacao;
//# sourceMappingURL=verificarAutenticacao.js.map