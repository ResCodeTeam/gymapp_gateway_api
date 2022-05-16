import { NextFunction, Request, Response } from "express";
import { checkUserIdExists, getFuncaoId, getUserFuncao } from "../helpers/dbHelpers";

export async function verificarAluno(request:Request, response:Response, next:NextFunction){
  const uid = response.locals.uid;
  
  const user = checkUserIdExists(uid)
  if(!user){
    throw new Error("User inexistente")
  }

  const funcao_id = await getUserFuncao(uid);
  const aluno_id = await getFuncaoId("Aluno")

  if(funcao_id==aluno_id){
    next();
  }
  else{
    throw new Error("Não possui autorização")
  }

}