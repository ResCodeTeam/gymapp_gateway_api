
import express from "express";
import { apiAdapter } from "../apiAdapter";
const  authRouter = express.Router();

const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = apiAdapter(BASE_URL);
            
authRouter.post('/auth/login', (req, res) => {
  gymapp_api.post(`/auth/login`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
authRouter.post('/auth/{id}/token', (req, res) => {
  gymapp_api.post(`/auth/{id}/token`,
  ).then(resp => {
    res.send(resp.data)
  })
})
            
authRouter.delete('/auth/logout', (req, res) => {
  gymapp_api.delete(`/auth/logout`,
  ).then(resp => {
    res.send(resp.data)
  })
})

export { authRouter }