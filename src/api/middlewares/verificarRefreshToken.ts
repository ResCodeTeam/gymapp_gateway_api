import { NextFunction, Request, Response } from "express";
import { checkInBlackList, getUserByID } from "../helpers/dbHelpers";
require('dotenv').config({ path: __dirname + '/.env' });
import { verify, decode } from 'jsonwebtoken';
import { client } from "../prisma/client";

export async function verificarRefreshToken(request: Request, response: Response, next: NextFunction) {
  if (request.body.refresh_token === undefined) {
    response.json({ 'msg': 'Token invalido' }).status(401)
  }
  const user = await client.users.findFirst({
    where: {
      refresh_token: request.body.refresh_token
    }
  })

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