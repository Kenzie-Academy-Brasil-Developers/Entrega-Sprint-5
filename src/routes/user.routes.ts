import { Router } from "express";

import createUserController from "../controllers/users/createUser.controller";
import getUsersController from "../controllers/users/getUsers.controller";
import softDeleteController from "../controllers/users/softDelete.controller";
import updateUserController from "../controllers/users/updateUser.controller";

import { authTokenMiddleware } from "../middlewares/authToken.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import updateAdminPermissionsMiddleWare from "../middlewares/updateAdminPermissions.middleware";



const routes = Router()

export const userRoutes = () => {

        routes.post("/", createUserController)
        routes.get("/", authTokenMiddleware, isAdmMiddleware, getUsersController)
        routes.delete("/:id", authTokenMiddleware, isAdmMiddleware, softDeleteController)
        routes.patch("/:id", updateAdminPermissionsMiddleWare, updateUserController)

        return routes
}