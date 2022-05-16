
import express from "express";
import { apiAdapter } from "../apiAdapter";
const authRouter = express.Router();

const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = apiAdapter(BASE_URL);

authRouter.post('/auth/login', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.post(`/auth/login`,
    req.body
  ).then(resp => {
    res.send(resp.data)
  })
})

authRouter.post('/auth/token', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.post(`/auth/${userId}/token`,
  ).then(resp => {
    res.send(resp.data)
  })
})

authRouter.delete('/auth/logout', (req, res) => {
  const userId = res.locals.uid;
  gymapp_api.delete(`/auth/logout`,
  ).then(resp => {
    res.send(resp.data)
  })
})
export { authRouter }