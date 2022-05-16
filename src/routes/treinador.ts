
import express from "express";
import { apiAdapter } from "../apiAdapter";
const treinadorRouter = express.Router();

const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = apiAdapter(BASE_URL);

treinadorRouter.delete('/treinador/exercicios/:exercicioId', (req, res) => {
  const userId = res.locals.uid;
  const exercicioId = req.params.exercicioId;
  gymapp_api.delete(`/treinador/exercicios/${exercicioId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.put('/treinador/exercicios', (req, res) => {
  const userId = res.locals.uid;
  const exercicioId = req.body.exercicioId;
  let body = req.body;
  delete body['exercicioId'];
  gymapp_api.put(`/treinador/exercicios/${exercicioId}`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.get('/treinador/avaliacoes/:aluno_id', (req, res) => {
  const userId = res.locals.uid;
  const aluno_id = req.params.aluno_id;
  gymapp_api.get(`/treinador/avaliacoes/${aluno_id}`,
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.post('/treinador/avaliacoes', (req, res) => {
  const userId = res.locals.uid;
  const aluno_id = req.body.aluno_id;
  let body = req.body;
  delete body['aluno_id'];
  gymapp_api.post(`/treinador/avaliacoes/${aluno_id}`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.put('/treinador/avaliacoes', (req, res) => {
  const userId = res.locals.uid;
  const avaliacaoId = req.body.avaliacaoId;
  let body = req.body;
  delete body['avaliacaoId'];
  gymapp_api.put(`/treinador/avaliacoes/${avaliacaoId}`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.delete('/treinador/avaliacoes/:avaliacao_id', (req, res) => {
  const userId = res.locals.uid;
  const avaliacao_id = req.params.avaliacao_id;
  gymapp_api.delete(`/treinador/avaliacoes/${avaliacao_id}`,
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.get('/treinador/exercicios/treinador', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.get(`/treinador/exercicios/treinador`,
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.post('/treinador/exercicios', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.post(`/treinador/exercicios/`,
    req.body
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.get('/treinador/exercicios', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.get(`/treinador/exercicios/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.post('/treinador/exercicios/imagens', (req, res) => {
  const userId = res.locals.uid;
  const exercicioId = req.body.exercicioId;
  let body = req.body;
  delete body['exercicioId'];
  gymapp_api.post(`/treinador/exercicios/${exercicioId}/imagens`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.delete('/treinador/exercicios/:exercicioId/imagens/:imagemId', (req, res) => {
  const userId = res.locals.uid;
  const exercicioId = req.params.exercicioId;
  const imagemId = req.params.imagemId;

  gymapp_api.delete(`/treinador/exercicios/${exercicioId}/imagens/${imagemId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.post('/treinador/exercicios/musculos', (req, res) => {
  const userId = res.locals.uid;
  const exercicioId = req.body.exercicioId;
  const musculoId = req.body.musculoId;
  let body = req.body;
  delete body['exercicioId'];
  delete body['musculoId'];
  gymapp_api.post(`/treinador/exercicios/${exercicioId}/musculos/${musculoId}`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.delete('/treinador/exercicios/:exercicioId/musculos/:musculoId', (req, res) => {
  const userId = res.locals.uid;
  const exercicioId = req.params.exercicioId;
  const musculoId = req.params.musculoId;
  gymapp_api.delete(`/treinador/exercicios/${exercicioId}/musculos/${musculoId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.get('/treinador/agenda/desafios', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.get(`/treinador/agenda/desafios/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.get('/treinador/agenda/avaliacoes', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.get(`/treinador/agenda/avaliacoes/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.post('/treinador/desafio/submissoes', (req, res) => {
  const userId = res.locals.uid;
  const desafioId = req.body.desafioId;
  let body = req.body;
  delete body['desafioId'];
  gymapp_api.post(`/treinador/desafio/${desafioId}/submissoes`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.get('/treinador/plano/:uid/:startDate/:endDate', (req, res) => {
  const userId = res.locals.uid;
  const uid = req.params.uid;
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;

  gymapp_api.get(`/treinador/plano/${uid}/${startDate}/${endDate}`,
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.put('/treinador/agenda/avaliacao', (req, res) => {
  const userId = res.locals.uid;
  const agendamentoId = req.body.agendamentoId;
  let body = req.body;
  delete body['agendamentoId'];
  gymapp_api.put(`/treinador/agenda/avaliacao/${agendamentoId}/`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.delete('/treinador/agenda/avaliacao/:agendamentoId', (req, res) => {
  const userId = res.locals.uid;
  const agendamentoId = req.params.agendamentoId;

  gymapp_api.delete(`/treinador/agenda/avaliacao/${agendamentoId}/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.put('/treinador/agenda/desafios', (req, res) => {
  const userId = res.locals.uid;
  const agendamentoId = req.body.agendamentoId;
  let body = req.body;
  delete body['agendamentoId'];
  gymapp_api.put(`/treinador/agenda/desafios/${agendamentoId}/`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.delete('/treinador/agenda/desafios/:agendamentoId', (req, res) => {
  const userId = res.locals.uid;
  const agendamentoId = req.params.agendamentoId;
  gymapp_api.delete(`/treinador/agenda/desafios/${agendamentoId}/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.post('/treinador/planoTreino', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.post(`/treinador/planoTreino`,
    req.body
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.delete('/treinador/plano/:planoId', (req, res) => {
  const userId = res.locals.uid;
  const planoId = req.params.planoId;
  gymapp_api.delete(`/treinador/plano/${planoId}/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.put('/treinador/plano', (req, res) => {
  const userId = res.locals.uid;
  const planoId = req.body.planoId;
  let body = req.body;
  delete body['planoId'];

  gymapp_api.put(`/treinador/plano/${planoId}`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.get('/treinador/treinos', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.get(`/treinador/treinos/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.get('/treinador/locaisMedida', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.get(`/treinador/locaisMedida/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

treinadorRouter.delete('/treinador/desafio/:desafioId/submissoes/:submissaoId', (req, res) => {
  const userId = res.locals.uid;
  const desafioId = req.params.desafioId;
  const submissaoId = req.params.submissaoId;
  gymapp_api.delete(`/treinador/desafio/${desafioId}/submissoes/${submissaoId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
export { treinadorRouter }