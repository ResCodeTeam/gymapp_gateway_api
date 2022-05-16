import { NextFunction, Request, Response } from "express";
import { checkInBlackList, getUserByID } from "../helpers/dbHelpers";
require('dotenv').config({ path: __dirname + '/.env' });
import { verify, decode } from 'jsonwebtoken';

export async function verificarAutenticacao(request: Request, response: Response, next: NextFunction) {
    const auth = request.headers.authorization;
    if (!auth) {
        throw new Error("Token invalido")
    }

    const [, token] = auth.split(" ");


    try {
        verify(token, process.env.SECRET_KEY_TOKEN);
    } catch (e) {
        throw new Error("Token invalido")
    }

    const inBlackList = await checkInBlackList(token);
    if (inBlackList) {
        throw new Error("Token invalido")
    }

    //obter id do user
    let uid = decode(token)['sub'].toString();
    response.locals.uid = uid;
    response.locals.token = token;

    //verificar se o user existe
    const user = await getUserByID(uid)
    if (!user) {
        throw new Error("User inexistente")
    }

    const refreshToken = user.refresh_token
    if (!refreshToken) {
        throw new Error("Sessão invalida")
    }

    try {
        verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
    } catch (e) {
        throw new Error("Sessão invalida")
    }


    next();

}