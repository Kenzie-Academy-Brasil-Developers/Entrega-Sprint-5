import { Request, Response } from "express"
import ErrorHTTP, { handleError } from "../../errors/ErrorHTTP"
import getPropertiesService from "../../services/properties/getProperties.service"

const getPropertiesController = async (req: Request, res: Response) => {
    try {
        const properties = await getPropertiesService()

        return res.status(200).send(properties)
    } catch (err) {
        if(err instanceof ErrorHTTP) {
            handleError(err, res)
        }
    }
}

export default getPropertiesController