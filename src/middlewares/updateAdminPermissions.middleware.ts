import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const updateAdminPermissionsMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const { id } = req.params

        jwt.verify(token as string , process.env.SECRET_KEY as string, (err: any, decoded: any) => {
            if(err){
                return res.status(401).json({message: "Invalid Token"})
            }
            if(decoded.id !== id && !decoded.isAdm){
                return res.status(401).json({message: "Admin permissions needed"})
            }
            next()
        })

    } catch (error) {
        return res.status(401).json({message: "Invalid Token"})
    }
}

export default updateAdminPermissionsMiddleWare