import { Router } from "express";
import createPropertyController from "../controllers/properties/createProperty.controller";
import getPropertiesController from "../controllers/properties/getProperties.controller";



import { authTokenMiddleware } from "../middlewares/authToken.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";

const routes = Router()

export const propertiesRoutes = () => {

        routes.post("/", authTokenMiddleware, isAdmMiddleware, createPropertyController)
        routes.get("/", getPropertiesController)

        return routes
}