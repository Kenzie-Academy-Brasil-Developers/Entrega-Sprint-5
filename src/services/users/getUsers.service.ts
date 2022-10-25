import { User } from "../../entities/users.entity";
import AppDataSource from "../../data-source";
import { IUser } from "../../interfaces/users";
import ErrorHTTP from "../../errors/ErrorHTTP";


const getUsersService = async (): Promise<IUser[]> => {

    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    if(!users){
        throw new ErrorHTTP("Users not found", 404)
    }

    const usersReturn = users.map((user) => {
        const newUser: IUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdm: user.isAdm,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }

        return newUser
    })

    return usersReturn
}

export default getUsersService