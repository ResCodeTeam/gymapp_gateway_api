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
exports.verificarAdmin = void 0;
const dbHelpers_1 = require("../helpers/dbHelpers");
function verificarAdmin(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const uid = response.locals.uid;
        const user = (0, dbHelpers_1.checkUserIdExists)(uid);
        if (!user) {
            response.json({ 'msg': 'User inexistente' }).status(401);
        }
        const funcao_id = yield (0, dbHelpers_1.getUserFuncao)(uid);
        const admin_id = yield (0, dbHelpers_1.getFuncaoId)("Administrador");
        if (funcao_id == admin_id) {
            next();
        }
        else {
            response.json({ 'msg': 'Não possui autorização' }).status(401);
        }
    });
}
exports.verificarAdmin = verificarAdmin;
//# sourceMappingURL=verificarAdmin.js.map