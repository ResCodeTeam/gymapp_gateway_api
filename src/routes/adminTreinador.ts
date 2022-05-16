
import express from "express";
import { apiAdapter } from "../apiAdapter";
const  adminTreinadorRouter = express.Router();

const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = apiAdapter(BASE_URL);
        
adminTreinadorRouter.post('/adminTreinador/ginasio/{ginasioId}/desafio/', (req, res) => {
  gymapp_api.post(`/adminTreinador/ginasio/{ginasioId}/desafio/`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminTreinadorRouter.delete('/adminTreinador/desafio/{desafioId}', (req, res) => {
  gymapp_api.delete(`/adminTreinador/desafio/{desafioId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminTreinadorRouter.put('/adminTreinador/desafio/{desafioId}', (req, res) => {
  gymapp_api.put(`/adminTreinador/desafio/{desafioId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminTreinadorRouter.put('/adminTreinador/desafio/{desafioId}/editar', (req, res) => {
  gymapp_api.put(`/adminTreinador/desafio/{desafioId}/editar`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
adminTreinadorRouter.get('/adminTreinador/musculos/', (req, res) => {
  gymapp_api.get(`/adminTreinador/musculos/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

export { adminTreinadorRouter }