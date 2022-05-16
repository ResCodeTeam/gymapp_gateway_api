
import express from "express";
import { apiAdapter } from "../apiAdapter";
const testeRouter = express.Router();

const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = apiAdapter(BASE_URL);

testeRouter.post('/aluno/agenda/desafios/', (req, res) => {
  gymapp_api.post(`/aluno/agenda/desafios/`,
  ).then(resp => {
    res.send(resp.data)
  })
})

export { testeRouter };