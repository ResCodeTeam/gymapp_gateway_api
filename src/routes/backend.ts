
import express from "express";
import { apiAdapter } from "../apiAdapter";
const  backendRouter = express.Router();

const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = apiAdapter(BASE_URL);
            
backendRouter.post('/backend/funcoes', (req, res) => {
  gymapp_api.post(`/backend/funcoes`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
backendRouter.post('/backend/cp', (req, res) => {
  gymapp_api.post(`/backend/cp`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
backendRouter.post('/backend/registo', (req, res) => {
  gymapp_api.post(`/backend/registo`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
backendRouter.post('/backend/atividades', (req, res) => {
  gymapp_api.post(`/backend/atividades`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
backendRouter.delete('/backend/atividades/{atividadeId}', (req, res) => {
  gymapp_api.delete(`/backend/atividades/{atividadeId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
backendRouter.put('/backend/atividades/{atividadeId}', (req, res) => {
  gymapp_api.put(`/backend/atividades/{atividadeId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
backendRouter.put('/backend/musculos/{musculoId}', (req, res) => {
  gymapp_api.put(`/backend/musculos/{musculoId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
backendRouter.post('/backend/musculos/', (req, res) => {
  gymapp_api.post(`/backend/musculos/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

export { backendRouter }