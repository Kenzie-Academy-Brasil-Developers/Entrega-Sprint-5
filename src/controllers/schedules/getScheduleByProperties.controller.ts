import { Request, Response } from "express"
import ErrorHTTP, { handleError } from "../../errors/ErrorHTTP"
import getScheduleByPropertiesService from "../../services/schedules/getSchedulesByProperty.service"

const getScheduleByPropertiesController = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
        const properties = await getScheduleByPropertiesService(id)

        return res.status(200).send(properties)
    } catch (err) {
        if(err instanceof ErrorHTTP) {
            handleError(err, res)
        }
    }
}

export default getScheduleByPropertiesController