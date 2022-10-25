import { Router } from "express";

import createScheduleController from "../controllers/schedules/createSchedule.controller";
import getScheduleByPropertiesController from "../controllers/schedules/getScheduleByProperties.controller";




import { authTokenMiddleware } from "../middlewares/authToken.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";

const routes = Router()

export const schedulesRoutes = () => {

        routes.post("/", authTokenMiddleware, createScheduleController)
        routes.get("/properties/:id", authTokenMiddleware, isAdmMiddleware, getScheduleByPropertiesController)

        return routes
}