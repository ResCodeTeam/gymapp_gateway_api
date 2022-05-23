import { NextFunction, Request, Response } from "express";
import { checkUserIdExists, getFuncaoId, getUserFuncao } from "../helpers/dbHelpers";

export async function verificarAluno(request: Request, response: Response, next: NextFunction) {
  const uid = response.locals.uid;

  const user = checkUserIdExists(uid)
  if (!user) {
    response.status(401).json({ 'msg': 'User inexistente' })
  }

  const funcao_id = await getUserFuncao(uid);
  const aluno_id = await getFuncaoId("Aluno")

  if (funcao_id == aluno_id) {
    next();
  }
  else {
    response.status(401).json({ 'msg': 'Não possui autorização' })
  }

}