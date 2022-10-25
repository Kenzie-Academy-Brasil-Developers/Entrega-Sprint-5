import { Request, Response, NextFunction } from "express";
import ErrorHTTP from "../errors/ErrorHTTP";

export default ( error: any, req: Request, res: Response, _: NextFunction) => {
    if(error instanceof ErrorHTTP){
        return res.status(error.statusCode).json({
            message: error.message
        })
    }

    console.log(error)

    return res.status(500).json({message: "Internal server Error!"})
}