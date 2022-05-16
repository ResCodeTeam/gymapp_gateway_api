import express from "express";
import { apiAdapter } from "../apiAdapter";
const  alunoRouter = express.Router();

const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = apiAdapter(BASE_URL);

import express from "express";
import { verificarAluno } from "../api/middlewares/verificarAluno";
import { verificarAutenticacao } from "../api/middlewares/verificarAutenticacao";
import { apiAdapter } from "../apiAdapter";
const alunoRouter = express.Router();

const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = apiAdapter(BASE_URL);

alunoRouter.post('/aluno/agenda/avaliacao', verificarAutenticacao, verificarAluno, (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.post(`/aluno/agenda/avaliacao/`,
    req.body
  ).then(resp => {
    res.send(resp.data)
  })
})

alunoRouter.post('/aluno/agenda/desafios', verificarAutenticacao, verificarAluno, (req, res) => {
  const userId = res.locals.uid;
  const desafioId = req.body.desafioId;
  let body = req.body;
  delete body['desafioId'];
  gymapp_api.post(`/aluno/agenda/desafios/${desafioId}`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

alunoRouter.get('/aluno/avaliacoes', verificarAutenticacao, verificarAluno, (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.get(`/aluno/avaliacoes/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

alunoRouter.post('/aluno/treinos', verificarAutenticacao, verificarAluno, (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.post(`/aluno/treinos`,
    req.body
  ).then(resp => {
    res.send(resp.data)
  })
})

alunoRouter.delete('/aluno/treino/:treinoId', verificarAutenticacao, verificarAluno, (req, res) => {
  const userId = res.locals.uid;
  const treinoId = req.params.treinoId;
  gymapp_api.delete(`/aluno/treino/${treinoId}/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

alunoRouter.delete('/aluno/agenda/desafios/:agendamentoId/agendamento', verificarAutenticacao, verificarAluno, (req, res) => {
  const userId = res.locals.uid;
  const agendamentoId = req.params.agendamentoId;
  gymapp_api.delete(`/aluno/agenda/desafios/${agendamentoId}/agendamento/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

alunoRouter.delete('/aluno/agenda/avaliacao/:agendamentoId/agendamento', verificarAutenticacao, verificarAluno, (req, res) => {
  const userId = res.locals.uid;
  const agendamentoId = req.params.agendamentoId;
  gymapp_api.delete(`/aluno/agenda/avaliacao/${agendamentoId}/agendamento/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

alunoRouter.get('/aluno/treinos', verificarAutenticacao, verificarAluno, (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.get(`/aluno/treinos/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

alunoRouter.put('/aluno/treinos', verificarAutenticacao, verificarAluno, (req, res) => {
  const userId = res.locals.uid;
  const treinoId = req.body.treinoId;
  let body = req.body;
  delete body['treinoId'];
  gymapp_api.put(`/aluno/treinos/${treinoId}`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

alunoRouter.get('/aluno/planoTreino/:startDate/:endDate', verificarAutenticacao, verificarAluno, (req, res) => {
  const userId = res.locals.uid;
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;
  gymapp_api.get(`/aluno/planoTreino/${startDate}/${endDate}`,
  ).then(resp => {
    res.send(resp.data)
  })
})

alunoRouter.get('/aluno/agenda/avaliacoes', verificarAutenticacao, verificarAluno, (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.get(`/aluno/agenda/avaliacoes/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

alunoRouter.get('/aluno/agenda/desafios', verificarAutenticacao, verificarAluno, (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.get(`/aluno/agenda/desafios/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

alunoRouter.put('/aluno/plano/realizado', verificarAutenticacao, verificarAluno, (req, res) => {
  const userId = res.locals.uid;
  const planoId = req.body.planoId;
  let body = req.body;
  delete body['planoId'];
  gymapp_api.put(`/aluno/plano/${planoId}/realizado/`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

alunoRouter.delete('/aluno/plano/:planoId/realizado', verificarAutenticacao, verificarAluno, (req, res) => {
  const userId = res.locals.uid;
  const planoId = req.params.planoId;
  gymapp_api.delete(`/aluno/plano/${planoId}/realizado/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

export { alunoRouter }