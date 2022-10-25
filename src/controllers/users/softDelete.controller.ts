import { Request, Response } from "express"
import ErrorHTTP, { handleError } from "../../errors/ErrorHTTP"
import softDeleteService from "../../services/users/softDelete.service"

const softDeleteController = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const deleted = await softDeleteService(id)

        if(deleted){
            return res.status(204).send()
        }
        else{
            return res.status(404).send({
                message: "User not Found"
            })
        }
    } catch (err) {
        if(err instanceof ErrorHTTP) {
            handleError(err, res)
        }
    }
}

export default softDeleteController