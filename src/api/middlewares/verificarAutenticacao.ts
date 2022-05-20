import { NextFunction, Request, Response } from "express";
import { checkInBlackList, getUserByID } from "../helpers/dbHelpers";
require('dotenv').config({ path: __dirname + '/.env' });
import { verify, decode } from 'jsonwebtoken';

export async function verificarAutenticacao(request: Request, response: Response, next: NextFunction) {
    const auth = request.headers.authorization;
    if (!auth) {
        return response.json({ 'msg': 'Token invalido' }).status(401)
    }

    const [, token] = auth.split(" ");


    try {
        verify(token, process.env.SECRET_KEY_TOKEN);
    } catch (e) {
        return response.json({ 'msg': 'Token invalido' }).status(401)
    }

    const inBlackList = await checkInBlackList(token);
    if (inBlackList) {
        response.json({ 'msg': 'Token invalido' }).status(401)
    }

    //obter id do user
    let uid = decode(token)['sub'].toString();
    response.locals.uid = uid;
    response.locals.token = token;

    //verificar se o user existe
    const user = await getUserByID(uid)
    if (!user) {
        response.json({ 'msg': 'User inexistente' }).status(401)

    }

    const refreshToken = user.refresh_token
    if (!refreshToken) {
        response.json({ 'msg': 'Sessão invalida' }).status(401)

    }

    try {
        verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
    } catch (e) {
        response.json({ 'msg': 'Sessão invalida' }).status(401)

    }


    next();

}