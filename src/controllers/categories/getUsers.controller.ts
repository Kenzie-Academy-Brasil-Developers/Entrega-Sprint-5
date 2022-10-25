import { Request, Response } from "express"
import ErrorHTTP, { handleError } from "../../errors/ErrorHTTP"
import getCategoriesService from "../../services/categories/getCategories.service"

const getCategoriesController = async (req: Request, res: Response) => {
    try {
        const categories = await getCategoriesService()

        return res.status(200).send(categories)
    } catch (err) {
        if(err instanceof ErrorHTTP) {
            handleError(err, res)
        }
    }
}

export default getCategoriesController