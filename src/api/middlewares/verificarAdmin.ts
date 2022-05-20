import { NextFunction, Request, Response } from "express";
import { checkUserIdExists, getFuncaoId, getUserFuncao } from "../helpers/dbHelpers";

export async function verificarAdmin(request: Request, response: Response, next: NextFunction) {
    const uid = response.locals.uid;
    const user = checkUserIdExists(uid)

    if (!user) {
        return response.json({ 'msg': 'User inexistente' }).status(401)
    }

    const funcao_id = await getUserFuncao(uid);
    const admin_id = await getFuncaoId("Administrador")

    if (funcao_id == admin_id) {
        next();
    }
    else {

        return response.json({ 'msg': 'Não possui autorização' }).status(401)
    }

}