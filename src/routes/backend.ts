
import express from "express";
import { apiAdapter } from "../apiAdapter";
const backendRouter = express.Router();

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

backendRouter.delete('/backend/atividades/:atividadeId', (req, res) => {
  const atividadeId = req.params.atividadeId;
  gymapp_api.delete(`/backend/atividades/${atividadeId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})

backendRouter.put('/backend/atividades/', (req, res) => {
  const atividadeId = req.body.atividadeId;
  let body = req.body;
  delete body['atividadeId'];
  gymapp_api.put(`/backend/atividades/${atividadeId}`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

backendRouter.put('/backend/musculos/', (req, res) => {
  const musculoId = req.body.musculoId;
  let body = req.body;
  delete body['atividadeId'];
  gymapp_api.put(`/backend/musculos/${musculoId}`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

backendRouter.post('/backend/musculos/', (req, res) => {
  gymapp_api.post(`/backend/musculos/`,
    req.body
  ).then(resp => {
    res.send(resp.data)
  })
})

export { backendRouter }