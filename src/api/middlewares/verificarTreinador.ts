import { NextFunction, Request, Response } from "express";
import { checkUserIdExists, getFuncaoId, getUserFuncao } from "../helpers/dbHelpers";

export async function verificarTreinador(request:Request, response:Response, next:NextFunction){
  const uid = response.locals.uid;
    
  const user = checkUserIdExists(uid)
  if(!user){
    throw new Error("User inexistente")
  }

  const funcao_id = await getUserFuncao(uid);
  const treinador_id = await getFuncaoId("Treinador")

  if(funcao_id==treinador_id){
    next();
  }
  else{
    throw new Error("Não possui autorização")
  }

}