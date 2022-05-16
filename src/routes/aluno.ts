import express from "express";
import { apiAdapter } from "../apiAdapter";
const  alunoRouter = express.Router();

const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = apiAdapter(BASE_URL);

alunoRouter.post('/aluno/agenda/avaliacao/', (req, res) => {
  gymapp_api.post(`/aluno/agenda/avaliacao/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
alunoRouter.post('/aluno/agenda/desafios/{desafioId}', (req, res) => {
  gymapp_api.post(`/aluno/agenda/desafios/{desafioId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
alunoRouter.get('/aluno/avaliacoes/', (req, res) => {
  gymapp_api.get(`/aluno/avaliacoes/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
alunoRouter.post('/aluno/treinos', (req, res) => {
  gymapp_api.post(`/aluno/treinos`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
alunoRouter.delete('/aluno/treino/{treinoId}/', (req, res) => {
  gymapp_api.delete(`/aluno/treino/{treinoId}/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
alunoRouter.delete('/aluno/agenda/desafios/{agendamentoId}/agendamento/', (req, res) => {
  gymapp_api.delete(`/aluno/agenda/desafios/{agendamentoId}/agendamento/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
alunoRouter.delete('/aluno/agenda/avaliacao/{agendamentoId}/agendamento/', (req, res) => {
  gymapp_api.delete(`/aluno/agenda/avaliacao/{agendamentoId}/agendamento/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
alunoRouter.get('/aluno/treinos/', (req, res) => {
  gymapp_api.get(`/aluno/treinos/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
alunoRouter.put('/aluno/treinos/{treinoId}', (req, res) => {
  gymapp_api.put(`/aluno/treinos/{treinoId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
alunoRouter.get('/aluno/planoTreino/{startDate}/{endDate}', (req, res) => {
  gymapp_api.get(`/aluno/planoTreino/{startDate}/{endDate}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
alunoRouter.get('/aluno/agenda/avaliacoes/', (req, res) => {
  gymapp_api.get(`/aluno/agenda/avaliacoes/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
alunoRouter.get('/aluno/agenda/desafios/', (req, res) => {
  gymapp_api.get(`/aluno/agenda/desafios/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
alunoRouter.put('/aluno/plano/{planoId}/realizado/', (req, res) => {
  gymapp_api.put(`/aluno/plano/{planoId}/realizado/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
alunoRouter.delete('/aluno/plano/{planoId}/realizado/', (req, res) => {
  gymapp_api.delete(`/aluno/plano/{planoId}/realizado/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

export { alunoRouter }