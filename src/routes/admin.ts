
import express from "express";
import { verificarAdmin } from "../api/middlewares/verificarAdmin";
import { verificarAutenticacao } from "../api/middlewares/verificarAutenticacao";
import { apiAdapter } from "../apiAdapter";
const adminRouter = express.Router();

const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = apiAdapter(BASE_URL);
    
adminRouter.post('/admin/marca/',verificarAutenticacao,verificarAdmin, (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.post(`/admin/marca/`, req.body
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.get('/admin/marca/',verificarAutenticacao,verificarAdmin, (req, res) => {
  const donoId = res.locals.uid;
  gymapp_api.get(`/admin/marca/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.put('/admin/ginasio/editar/',verificarAutenticacao,verificarAdmin, (req, res) => {
  const userId = res.locals.uid;
  const ginasioId = req.body.ginasioId;
  gymapp_api.put(`/admin/ginasio/editar/${ginasioId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.post('/admin/marca/ginasio/',verificarAutenticacao,verificarAdmin, (req, res) => {
  const userId = res.locals.uid;
  const marcaId = req.body.marcaId;
  gymapp_api.post(`/admin/marca/${marcaId}/ginasio/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.get('/admin/marca/:marcaId/ginasio/',verificarAutenticacao,verificarAdmin, (req, res) => {
  const userId = res.locals.uid;
  const marcaId = req.params.marcaId;
  gymapp_api.get(`/admin/marca/${marcaId}/ginasio/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.post('/admin/ginasio/modalidades',verificarAutenticacao,verificarAdmin, (req, res) => {
  const ginasioId = req.body.ginasioId;
  const adminId = res.locals.uid;
  gymapp_api.post(`/admin/ginasio/${ginasioId}/modalidades`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.get('/admin/ginasio/:ginasioId/modalidades',verificarAutenticacao,verificarAdmin, (req, res) => {
  const ginasioId = req.params.ginasioId;
  const userId = res.locals.uid;
  gymapp_api.get(`/admin/ginasio/${ginasioId}/modalidades`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.delete('/admin/aluno/remover/{uId}',verificarAutenticacao,verificarAdmin, (req, res) => {
  const userId = res.locals.uid;
  const uId = req.body.uId;
  gymapp_api.delete(`/admin/aluno/remover/${uId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.delete('/admin/ginasio/modalidades/',verificarAutenticacao,verificarAdmin, (req, res) => {
  const userId = res.locals.uid;
  const ginasioId = req.body.ginasioId;
  const modalidadeId = req.body.modalidadeId;
  gymapp_api.delete(`/admin/ginasio/${ginasioId}/modalidades/${modalidadeId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.put('/admin/ginasio/{ginasioId}/modalidades/{modalidadeId}',verificarAutenticacao,verificarAdmin, (req, res) => {
  const userId = res.locals.uid;
  const ginasioId = req.body.ginasioId;
  const modalidadeId = req.body.modalidadeId;
  gymapp_api.put(`/admin/ginasio/{ginasioId}/modalidades/{modalidadeId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.delete('/admin/treinador/{treinador_id}',verificarAutenticacao,verificarAdmin, (req, res) => {
  
  gymapp_api.delete(`/admin/treinador/{treinador_id}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.delete('/admin/marca/{marcaId}',verificarAutenticacao,verificarAdmin, (req, res) => {
  gymapp_api.delete(`/admin/marca/{marcaId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.get('/admin/marca/{marcaId}',verificarAutenticacao,verificarAdmin, (req, res) => {
  gymapp_api.get(`/admin/marca/{marcaId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.put('/admin/marca/{marcaId}',verificarAutenticacao,verificarAdmin, (req, res) => {
  gymapp_api.put(`/admin/marca/{marcaId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.post('/admin/marca/{marca_id}/treinadores',verificarAutenticacao,verificarAdmin, (req, res) => {
  gymapp_api.post(`/admin/marca/{marca_id}/treinadores`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.post('/admin/notificacao/user/{destinoId}',verificarAutenticacao,verificarAdmin, (req, res) => {
  gymapp_api.post(`/admin/notificacao/user/{destinoId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.post('/admin/marca/alunos/',verificarAutenticacao,verificarAdmin, (req, res) => {
  gymapp_api.post(`/admin/marca/alunos/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.delete('/admin/ginasio/{ginasioId}/',verificarAutenticacao,verificarAdmin, (req, res) => {
  gymapp_api.delete(`/admin/ginasio/{ginasioId}/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.get('/admin/ginasio/{ginasioId}/',verificarAutenticacao,verificarAdmin, (req, res) => {
  gymapp_api.get(`/admin/ginasio/{ginasioId}/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.post('/admin/marca/{marcaId}/localMedida',verificarAutenticacao,verificarAdmin, (req, res) => {
  gymapp_api.post(`/admin/marca/{marcaId}/localMedida`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.delete('/admin/marca/{marcaId}/localMedida/{localId}',verificarAutenticacao,verificarAdmin, (req, res) => {
  gymapp_api.delete(`/admin/marca/{marcaId}/localMedida/{localId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.post('/admin/notificacao/marca/{marcaId}',verificarAutenticacao,verificarAdmin, (req, res) => {
  gymapp_api.post(`/admin/notificacao/marca/{marcaId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.post('/admin/notificacao/ginasio/{ginasioId}',verificarAutenticacao,verificarAdmin, (req, res) => {
  gymapp_api.post(`/admin/notificacao/ginasio/{ginasioId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminRouter.get('/admin/ginasio/treinador/ver/{marcaId}',verificarAutenticacao,verificarAdmin, (req, res) => {
  gymapp_api.get(`/admin/ginasio/treinador/ver/{marcaId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})

export { adminRouter }