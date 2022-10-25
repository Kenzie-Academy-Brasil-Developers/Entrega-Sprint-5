import { Request, Response } from "express"
import ErrorHTTP, { handleError } from "../../errors/ErrorHTTP"
import createPropertyService from "../../services/properties/createProperty.service"

const createPropertyController = async (req: Request, res: Response) => {
    const {value, size, address, categoryId} = req.body

    try {
        const property = await createPropertyService({value, size, address, categoryId})

        return res.status(201).send(property)
    } catch (err) {
        if(err instanceof ErrorHTTP) {
            handleError(err, res)
        }
    }
}

export default createPropertyController