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
exports.getUserByID = exports.checkInBlackList = exports.getUserFuncao = exports.getFuncaoId = exports.checkUserIdExists = void 0;
const client_1 = require("../prisma/client");
function checkUserIdExists(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = yield client_1.client.users.findMany({
            where: {
                uid: userId
            }
        });
        return search.length != 0;
    });
}
exports.checkUserIdExists = checkUserIdExists;
function getFuncaoId(nome) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = yield client_1.client.funcoes.findFirst({
            where: {
                descricao: nome
            },
            select: {
                funcao_id: true
            }
        });
        if (search == null) {
            throw new Error("função inexistente");
        }
        return search === null || search === void 0 ? void 0 : search.funcao_id;
    });
}
exports.getFuncaoId = getFuncaoId;
function getUserFuncao(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = yield client_1.client.users.findUnique({
            where: {
                uid
            },
            select: {
                funcao_id: true
            }
        });
        return search.funcao_id;
    });
}
exports.getUserFuncao = getUserFuncao;
function checkInBlackList(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokens = yield client_1.client.black_list.findMany({
            where: {
                tokenId: token
            }
        });
        return tokens.length != 0;
    });
}
exports.checkInBlackList = checkInBlackList;
function getUserByID(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield client_1.client.users.findUnique({
            where: {
                uid: userId
            }
        });
        return user;
    });
}
exports.getUserByID = getUserByID;
//# sourceMappingURL=dbHelpers.js.map