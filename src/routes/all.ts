
import express from "express";
import { apiAdapter } from "../apiAdapter";
const allRouter = express.Router();

const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = apiAdapter(BASE_URL);

allRouter.get('/desafios/:desafioId/submissoes', (req, res) => {
  const userId = res.locals.uid;
  const desafioId = req.params.desafioId;
  gymapp_api.get(`/desafios/${desafioId}/submissoes`,
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.get('/alunos/ginasio/:ginasioId', (req, res) => {
  const userId = res.locals.uid;
  const ginasioId = req.params.ginasioId;
  gymapp_api.get(`/alunos/ginasio/${ginasioId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.post('/posts/comentarios', (req, res) => {
  const userId = res.locals.uid;
  const postId = req.body.postId;
  let body = req.body;
  delete body['postId'];
  gymapp_api.post(`/posts/${postId}/comentarios`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.post('/posts/comentario/gosto', (req, res) => {
  const userId = res.locals.uid;
  const postId = req.body.postId;
  const comentarioId = req.body.comentarioId;
  gymapp_api.post(`/posts/${postId}/comentario/${comentarioId}/gosto`,
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.delete('/posts/:postId/comentario/:comentarioId/gosto', (req, res) => {
  const userId = res.locals.uid;
  const postId = req.params.postId;
  const comentarioId = req.params.comentarioId;
  gymapp_api.delete(`/posts/${postId}/comentario/${comentarioId}/gosto`,
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.delete('/posts/:postId/comentario/:comentarioId', (req, res) => {
  const userId = res.locals.uid;
  const postId = req.params.postId;
  const comentarioId = req.params.comentarioId;

  gymapp_api.delete(`/posts/${postId}/comentario/${comentarioId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.get('/posts/:postId', (req, res) => {
  const userId = res.locals.uid;
  const postId = req.params.postId;
  gymapp_api.get(`/posts/${postId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.delete('/posts/:postId', (req, res) => {
  const userId = res.locals.uid;
  const postId = req.params.postId;
  gymapp_api.delete(`/posts/${postId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.put('/posts/', (req, res) => {
  const userId = res.locals.uid;
  const postId = req.body.postId;
  let body = req.body;
  delete body['postId'];
  gymapp_api.put(`/posts/${postId}`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.post('/posts/gostos', (req, res) => {
  const userId = res.locals.uid;
  const postId = req.body.postId;
  let body = req.body;
  delete body['postId'];
  gymapp_api.post(`/posts/${postId}/gostos`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.delete('/posts/:postId/gostos', (req, res) => {
  const userId = res.locals.uid;
  const postId = req.params.postId;
  gymapp_api.delete(`/posts/${postId}/gostos`,
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.get('/desafios/:desafioId', (req, res) => {
  const userId = res.locals.uid;
  const desafioId = req.params.desafioId;
  gymapp_api.get(`/desafios/${desafioId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.get('/atividades/', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.get(`/atividades/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.get('/definicoes', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.get(`/definicoes`,
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.put('/destinosNotificacao/notificacao/', (req, res) => {
  const userId = res.locals.uid;
  const notiId = req.body.notiId;
  gymapp_api.put(`/destinosNotificacao/notificacao/${notiId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.put('/perfil', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.put(`/perfil`,
    req.body
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.get('/perfil', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.get(`/perfil`,
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.get('/user/:uId', (req, res) => {
  const userId = res.locals.uid;
  const uId = req.params.uId;
  gymapp_api.get(`/user/${uId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.put('/definicoes/identificacao/', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.put(`/definicoes/identificacao/`,
    req.body
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.put('/definicoes/mencoes', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.put(`/definicoes/mencoes`,
    req.body
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.get('/posts', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.get(`/posts`,
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.post('/posts', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.post(`/posts`,
    req.body
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.put('/definicoes/perfil/privado/', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.put(`/definicoes/perfil/privado/`,
    req.body
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.get('/ginasio/:ginasioId/desafios/', (req, res) => {
  const userId = res.locals.uid;
  const ginasioId = req.params.ginasioId;
  gymapp_api.get(`/ginasio/${ginasioId}/desafios/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.get('/ginasio/:ginasioId/desafios/disponiveis', (req, res) => {
  const userId = res.locals.uid;
  const ginasioId = req.params.ginasioId;
  gymapp_api.get(`/ginasio/${ginasioId}/desafios/disponiveis`,
  ).then(resp => {
    res.send(resp.data)
  })
})

allRouter.get('/notificacoes', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.get(`/notificacoes`,
  ).then(resp => {
    res.send(resp.data)
  })
})
export { allRouter }