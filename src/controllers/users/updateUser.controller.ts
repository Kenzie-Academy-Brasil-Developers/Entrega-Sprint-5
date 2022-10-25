import { Request, Response } from "express"
import ErrorHTTP, { handleError } from "../../errors/ErrorHTTP"
import updateUserService from "../../services/users/updateUser.service"

const updateUserController = async (req: Request, res: Response) => {
    const { name, email, password, isAdm, isActive } = req.body
    const bodyId = req.body.id
    const { id } = req.params
    

    
    if(isAdm === false || isAdm === true){
        return res.status(401).send({
            message: "Can't update is Adm field"
          })
    }
    if(isActive === false || isActive === true){
        return res.status(401).send({
            message: "Can`t update is active field"
        })
    }
    if(bodyId || bodyId === true || bodyId === false){
        return res.status(401).send({
            message: "Can`t update id field"
        })
    }

    try {
        const update = await updateUserService({ id, name, email, password })

        if(update){
            return res.status(200).send({message: "User updated"})
        }
    } catch (err) {
        if(err instanceof ErrorHTTP) {
            handleError(err, res)
        }
    }
}

export default updateUserController