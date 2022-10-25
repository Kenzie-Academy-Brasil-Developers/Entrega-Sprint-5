import "reflect-metadata"
import "express-async-errors"
import express from "express"
import errorHandleMiddleware from "./middlewares/errorHandle.middleware"
import { appRoutes } from "./routes"


const app = express()
app.use(express.json())
appRoutes(app)
app.use(errorHandleMiddleware)

export default app