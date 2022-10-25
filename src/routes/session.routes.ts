import { Router } from "express";
import tokenGenerateController from "../controllers/users/tokenGenerate.controller";

const routes = Router()

export const sessionRoutes = () => {

        routes.post("/", tokenGenerateController)
    
        return routes
}