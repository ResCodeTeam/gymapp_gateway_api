
import express from "express";
import { apiAdapter } from "../../apiAdapter";
const testeRouter = express.Router();

const BASE_URL = 'http://localhost:2400';
const api = apiAdapter(BASE_URL);

testeRouter.get('/teste', (req, res) => {
  api.get('/hello').then(resp => {
    res.send(resp.data)
  })
})

export { testeRouter };