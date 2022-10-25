import { Request, Response } from "express"
import ErrorHTTP, { handleError } from "../../errors/ErrorHTTP"
import tokenGenerateService from "../../services/users/tokenGenerate.service"

const tokenGenerateController = async (req: Request, res: Response) => {

    const { email, password } = req.body

    try {
        const token = await tokenGenerateService({email, password})

        return res.status(200).send({token: token})
    }   catch (err) {
        if(err instanceof ErrorHTTP) {
            handleError(err, res)
        }
    }
}

export default tokenGenerateController