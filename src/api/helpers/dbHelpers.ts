import { client } from "../prisma/client";

export async function checkUserIdExists(userId: string) {
  const search = await client.users.findMany({
    where: {
      uid: userId
    }
  })
  return search.length != 0;
}

export async function getFuncaoId(nome: string) {
  const search = await client.funcoes.findFirst({
    where: {
      descricao: nome
    },
    select: {
      funcao_id: true
    }
  });
  if (search == null) {
    throw new Error("função inexistente")
  }
  return search?.funcao_id;
}

export async function getUserFuncao(uid: string) {

  const search = await client.users.findUnique({
    where: {
      uid
    },
    select: {
      funcao_id: true
    }
  });

  return search.funcao_id;
}


export async function checkInBlackList(token: string) {
  const tokens = await client.black_list.findMany({
    where: {
      tokenId: token
    }
  })

  return tokens.length != 0;
}

export async function getUserByID(userId: string) {
  const user = await client.users.findUnique({
    where: {
      uid: userId
    }
  })
  return user;
}