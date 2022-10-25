import { Request, Response } from "express"
import ErrorHTTP, { handleError } from "../../errors/ErrorHTTP"
import createUserService from "../../services/users/createUser.service"

const createUserController = async (req: Request, res: Response) => {

    const { name, email, password, isAdm } = req.body

    try {
        const user = await createUserService({name, email, password, isAdm})

        return res.status(201).send(user)
    } catch (err) {
        if(err instanceof ErrorHTTP) {
            handleError(err, res)
        }
    }
}

export default createUserController