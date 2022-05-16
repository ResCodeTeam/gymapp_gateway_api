
import express from "express";
import { apiAdapter } from "../apiAdapter";
const treinadorRouter = express.Router();

const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = apiAdapter(BASE_URL);
        
treinadorRouter.delete('/treinador/exercicios/{exercicioId}', (req, res) => {
  gymapp_api.delete(`/treinador/exercicios/{exercicioId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.put('/treinador/exercicios/{exercicioId}', (req, res) => {
  gymapp_api.put(`/treinador/exercicios/{exercicioId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.get('/treinador/avaliacoes/{aluno_id}', (req, res) => {
  gymapp_api.get(`/treinador/avaliacoes/{aluno_id}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.post('/treinador/avaliacoes/{aluno_id}', (req, res) => {
  gymapp_api.post(`/treinador/avaliacoes/{aluno_id}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.put('/treinador/avaliacoes/{avaliacao_id}', (req, res) => {
  gymapp_api.put(`/treinador/avaliacoes/{avaliacao_id}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.delete('/treinador/avaliacoes/{avaliacao_id}', (req, res) => {
  gymapp_api.delete(`/treinador/avaliacoes/{avaliacao_id}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.get('/treinador/exercicios/treinador', (req, res) => {
  gymapp_api.get(`/treinador/exercicios/treinador`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.post('/treinador/exercicios/', (req, res) => {
  gymapp_api.post(`/treinador/exercicios/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.get('/treinador/exercicios/', (req, res) => {
  gymapp_api.get(`/treinador/exercicios/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.post('/treinador/exercicios/{exercicioId}/imagens', (req, res) => {
  gymapp_api.post(`/treinador/exercicios/{exercicioId}/imagens`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.delete('/treinador/exercicios/{exercicioId}/imagens/{imagemId}', (req, res) => {
  gymapp_api.delete(`/treinador/exercicios/{exercicioId}/imagens/{imagemId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.post('/treinador/exercicios/{exercicioId}/musculos/{musculoId}', (req, res) => {
  gymapp_api.post(`/treinador/exercicios/{exercicioId}/musculos/{musculoId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.delete('/treinador/exercicios/{exercicioId}/musculos/{musculoId}', (req, res) => {
  gymapp_api.delete(`/treinador/exercicios/{exercicioId}/musculos/{musculoId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.get('/treinador/agenda/desafios/', (req, res) => {
  gymapp_api.get(`/treinador/agenda/desafios/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.get('/treinador/agenda/avaliacoes/', (req, res) => {
  gymapp_api.get(`/treinador/agenda/avaliacoes/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.post('/treinador/desafio/{desafioId}/submissoes', (req, res) => {
  gymapp_api.post(`/treinador/desafio/{desafioId}/submissoes`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.get('/treinador/plano/{uid}/{startDate}/{endDate}', (req, res) => {
  gymapp_api.get(`/treinador/plano/{uid}/{startDate}/{endDate}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.put('/treinador/agenda/avaliacao/{agendamentoId}/', (req, res) => {
  gymapp_api.put(`/treinador/agenda/avaliacao/{agendamentoId}/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.delete('/treinador/agenda/avaliacao/{agendamentoId}/', (req, res) => {
  gymapp_api.delete(`/treinador/agenda/avaliacao/{agendamentoId}/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.put('/treinador/agenda/desafios/{agendamentoId}/', (req, res) => {
  gymapp_api.put(`/treinador/agenda/desafios/{agendamentoId}/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.delete('/treinador/agenda/desafios/{agendamentoId}/', (req, res) => {
  gymapp_api.delete(`/treinador/agenda/desafios/{agendamentoId}/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.post('/treinador/planoTreino', (req, res) => {
  gymapp_api.post(`/treinador/planoTreino`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.delete('/treinador/plano/{planoId}/', (req, res) => {
  gymapp_api.delete(`/treinador/plano/{planoId}/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.put('/treinador/plano/{planoId}', (req, res) => {
  gymapp_api.put(`/treinador/plano/{planoId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.get('/treinador/treinos/', (req, res) => {
  gymapp_api.get(`/treinador/treinos/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.get('/treinador/locaisMedida/', (req, res) => {
  gymapp_api.get(`/treinador/locaisMedida/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
treinadorRouter.delete('/treinador/desafio/{desafioId}/submissoes/{submissaoId}', (req, res) => {
  gymapp_api.delete(`/treinador/desafio/{desafioId}/submissoes/{submissaoId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            export { treinadorRouter }