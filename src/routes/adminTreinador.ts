
import express from "express";
import { verificarAdminTreinador } from "../api/middlewares/verificarAdminTreinador";
import { verificarAutenticacao } from "../api/middlewares/verificarAutenticacao";
import { apiAdapter } from "../apiAdapter";
const adminTreinadorRouter = express.Router();

const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = apiAdapter(BASE_URL);

adminTreinadorRouter.post('/adminTreinador/ginasio/desafio/', verificarAutenticacao, verificarAdminTreinador, (req, res) => {
  const userId = res.locals.uid;
  const ginasioId = req.body.ginasioId;
  let body = req.body;
  delete body['ginasioId'];

  gymapp_api.post(`/${userId}/adminTreinador/ginasio/${ginasioId}/desafio/`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

adminTreinadorRouter.delete('/adminTreinador/desafio/:desafioId', verificarAutenticacao, verificarAdminTreinador, (req, res) => {
  const userId = res.locals.uid;
  const desafioId = req.params.desafioId;
  gymapp_api.delete(`/${userId}/adminTreinador/desafio/${desafioId}`,
  ).then(resp => {
    res.send(resp.data)
  })
})

adminTreinadorRouter.put('/adminTreinador/desafio/', verificarAutenticacao, verificarAdminTreinador, (req, res) => {
  const userId = res.locals.uid;
  const desafioId = req.body.desafioId;
  let body = req.body;
  delete body['desafioId'];
  gymapp_api.put(`/${userId}/adminTreinador/desafio/${desafioId}`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

adminTreinadorRouter.put('/adminTreinador/desafio/editar', verificarAutenticacao, verificarAdminTreinador, (req, res) => {
  const userId = res.locals.uid;
  const desafioId = req.body.desafioId;
  let body = req.body;
  delete body['desafioId'];
  gymapp_api.put(`/${userId}/adminTreinador/desafio/${desafioId}/editar`,
    body
  ).then(resp => {
    res.send(resp.data)
  })
})

adminTreinadorRouter.get('/adminTreinador/musculos/', verificarAutenticacao, verificarAdminTreinador, (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.get(`/${userId}/adminTreinador/musculos/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

export { adminTreinadorRouter }