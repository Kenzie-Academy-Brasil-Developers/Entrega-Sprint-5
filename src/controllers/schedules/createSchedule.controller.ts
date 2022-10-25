import { Request, Response } from "express"
import ErrorHTTP, { handleError } from "../../errors/ErrorHTTP"
import createScheduleService from "../../services/schedules/createSchedule.service"
import jwt from "jsonwebtoken"

const createScheduleController = async (req: Request, res: Response) => {
    
    const token = req.headers.authorization?.split(" ")[1];
    const { date, hour, propertyId } = req.body

    
    jwt.verify(token as string , process.env.SECRET_KEY as string, async (err: any, decoded: any) => {
        try {
            const userId = decoded.id
            const schedule = await createScheduleService({ date, hour, propertyId, userId})

            if(schedule){
                return res.status(201).send({
                    message: "Schedule created"
                })
            }
            
        } catch (err) {
            if(err instanceof ErrorHTTP) {
                handleError(err, res)
            }
        }
            
    })


}

export default createScheduleController