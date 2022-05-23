import express from "express";
import { verificarAutenticacao } from "../api/middlewares/verificarAutenticacao";
import { apiAdapter } from "../apiAdapter";
const authRouter = express.Router();

const BASE_URL = "http://localhost:8000/api/v1";
const gymapp_api = apiAdapter(BASE_URL);


authRouter.post('/auth/login', (req, res) => {
  gymapp_api.post(`/auth/login`,
    req.body
  ).then(resp => {
    res.send(resp.data)
  }).catch(err => {
    const resp = err.response
    res.send(resp.data).status(resp.status)
  })
})

authRouter.post('/auth/token', (req, res) => {
  gymapp_api.post(`/auth/token`,
    req.body
  ).then(resp => {
    console.log(resp.data, resp.status)
    res.send(resp.data)
  }).catch(err => {
    const resp = err.response
    console.log(resp.data, resp.status)
    res.status(resp.status).send(resp.data)
  })
})

authRouter.delete('/auth/logout', verificarAutenticacao, (req, res) => {

  const userId = res.locals.uid;
  gymapp_api
    .delete(`/auth/${userId}/logout`)
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((err) => {
      const resp = err.response;
      res.status(resp.status).send(resp.data);
    });
});

export { authRouter };
