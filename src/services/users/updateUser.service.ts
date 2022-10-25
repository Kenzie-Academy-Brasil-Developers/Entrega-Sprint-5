import { User } from "../../entities/users.entity";
import AppDataSource from "../../data-source";
import { IUserUpdate } from "../../interfaces/users";
import bcrypt from "bcryptjs"
import ErrorHTTP from "../../errors/ErrorHTTP";

const updateUserService = async ({id, name, email, password}: IUserUpdate): Promise<boolean> => {
    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const account = users.find(user => user.id === id)

    if(!account){
        throw new ErrorHTTP("Users not found", 404)
    }

    await userRepository.update(account.id, {
        name: name || account.name,
        email: email || account.email,
        password: password || account.password,
        createdAt: account.createdAt,
        updatedAt: new Date(),
    })
    return true
}

export default updateUserService