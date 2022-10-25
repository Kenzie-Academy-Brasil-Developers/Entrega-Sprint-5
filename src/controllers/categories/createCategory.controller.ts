import { Request, Response } from "express"
import ErrorHTTP, { handleError } from "../../errors/ErrorHTTP"
import createCategoryService from "../../services/categories/createCategory.service"

const createCategoryController = async (req: Request, res: Response) => {

    const { name } = req.body

    try {
        const category = await createCategoryService({name})

        return res.status(201).send(category)
    } catch (err) {
        if(err instanceof ErrorHTTP) {
            handleError(err, res)
        }
    }
}

export default createCategoryController