import { Request, Response } from "express"
import ErrorHTTP, { handleError } from "../../errors/ErrorHTTP"
import getUsersService from "../../services/users/getUsers.service"

const getUsersController = async (req: Request, res: Response) => {

    try {
        const users = await getUsersService()

        return res.status(200).send(users)
    } catch (err) {
        if(err instanceof ErrorHTTP) {
            handleError(err, res)
        }
    }
}

export default getUsersController