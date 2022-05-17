import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swagger.json"

import { morganConfig } from "./config/morganConfig";
import { adminRouter } from "./routes/admin";
import { adminTreinadorRouter } from "./routes/adminTreinador";
import { allRouter } from "./routes/all";
import { alunoRouter } from "./routes/aluno";
import { authRouter } from "./routes/auth";
import { backendRouter } from "./routes/backend";
import { treinadorRouter } from "./routes/treinador";

const app = express()

dotenv.config()

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

morganConfig(app)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  console.log(error)
  return response.status(500).json({
    status: "Error",
    message: error.message
  })
})

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(adminRouter)
app.use(adminTreinadorRouter)
app.use(allRouter)
app.use(alunoRouter)
app.use(authRouter)
app.use(backendRouter)
app.use(treinadorRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running! on port: ${PORT}`)
});



export { app };