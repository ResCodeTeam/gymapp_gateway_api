
import express from "express";
import { apiAdapter } from "../apiAdapter";
const  allRouter = express.Router();

const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = apiAdapter(BASE_URL);
            
allRouter.get('/desafios/{desafioId}/submissoes', (req, res) => {
  gymapp_api.get(`/desafios/{desafioId}/submissoes`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.get('/alunos/ginasio/{ginasioId}', (req, res) => {
  gymapp_api.get(`/alunos/ginasio/{ginasioId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.post('/posts/{id}/comentarios', (req, res) => {
  gymapp_api.post(`/posts/{id}/comentarios`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.post('/posts/{id}/comentario/{comentarioId}/gosto', (req, res) => {
  gymapp_api.post(`/posts/{id}/comentario/{comentarioId}/gosto`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.delete('/posts/{id}/comentario/{comentarioId}/gosto', (req, res) => {
  gymapp_api.delete(`/posts/{id}/comentario/{comentarioId}/gosto`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.delete('/posts/{id}/comentario/{comentarioId}', (req, res) => {
  gymapp_api.delete(`/posts/{id}/comentario/{comentarioId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.get('/posts/{id}', (req, res) => {
  gymapp_api.get(`/posts/{id}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.delete('/posts/{id}', (req, res) => {
  gymapp_api.delete(`/posts/{id}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.put('/posts/{id}', (req, res) => {
  gymapp_api.put(`/posts/{id}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.post('/posts/{id}/gostos', (req, res) => {
  gymapp_api.post(`/posts/{id}/gostos`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.delete('/posts/{id}/gostos', (req, res) => {
  gymapp_api.delete(`/posts/{id}/gostos`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.get('/desafios/{desafioId}', (req, res) => {
  gymapp_api.get(`/desafios/{desafioId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.get('/atividades/', (req, res) => {
  gymapp_api.get(`/atividades/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.get('/definicoes', (req, res) => {
  gymapp_api.get(`/definicoes`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.put('/destinosNotificacao/notificacao/{notiId}', (req, res) => {
  gymapp_api.put(`/destinosNotificacao/notificacao/{notiId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.put('/perfil', (req, res) => {
  gymapp_api.put(`/perfil`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.get('/perfil', (req, res) => {
  gymapp_api.get(`/perfil`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.get('/user/{uId}', (req, res) => {
  gymapp_api.get(`/user/{uId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.put('/definicoes/identificacao/', (req, res) => {
  gymapp_api.put(`/definicoes/identificacao/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.put('/definicoes/mencoes', (req, res) => {
  gymapp_api.put(`/definicoes/mencoes`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.get('/posts', (req, res) => {
  gymapp_api.get(`/posts`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.post('/posts', (req, res) => {
  gymapp_api.post(`/posts`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.put('/definicoes/perfil/privado/', (req, res) => {
  gymapp_api.put(`/definicoes/perfil/privado/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.get('/ginasio/{ginasioId}/desafios/', (req, res) => {
  gymapp_api.get(`/ginasio/{ginasioId}/desafios/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.get('/ginasio/{ginasioId}/desafios/disponiveis', (req, res) => {
  gymapp_api.get(`/ginasio/{ginasioId}/desafios/disponiveis`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
allRouter.get('/notificacoes', (req, res) => {
  gymapp_api.get(`/notificacoes`,
  ).then(resp => {
    res.send(resp.data)
  })
})

export { allRouter }