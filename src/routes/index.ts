import { Express } from "express";
import { categoriesRoutes } from "./categories.routes";
import { propertiesRoutes } from "./properties.routes";
import { schedulesRoutes } from "./schedules.routes";
import { sessionRoutes } from "./session.routes";
import { userRoutes } from "./user.routes";

export const appRoutes = (app: Express) => {
    
    app.use("/users", userRoutes())
    app.use("/login", sessionRoutes())
    app.use("/categories", categoriesRoutes())
    app.use("/properties", propertiesRoutes())
    app.use("/schedules", schedulesRoutes())

}