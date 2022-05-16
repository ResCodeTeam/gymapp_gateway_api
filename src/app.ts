import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { morganConfig } from "./config/morganConfig";
import { testeRouter } from "./api/routes/teste";



const app = express()

dotenv.config()

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(testeRouter)


morganConfig(app)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  console.log(error)
  return response.status(500).json({
    status: "Error",
    message: error.message
  })
})


app.get('/hello', (req, resp) => {
  return resp.send('HELLO WORLD!');
})
app.get('/dois/free', (req, resp) => {
  return resp.send('HELLO WORLD2!');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running! on port: ${PORT}`)
});



export { app };