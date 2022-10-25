import { Router } from "express";

import createCategoryController from "../controllers/categories/createCategory.controller";
import getCategoriesController from "../controllers/categories/getUsers.controller";
import listPropertiesByCategoryController from "../controllers/properties/listPropertiesByCategory.controller";

import { authTokenMiddleware } from "../middlewares/authToken.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";

const routes = Router()

export const categoriesRoutes = () => {

        routes.post("/", authTokenMiddleware, isAdmMiddleware, createCategoryController)
        routes.get("/", getCategoriesController)
        routes.get("/:id/properties", listPropertiesByCategoryController)
    
        return routes
}