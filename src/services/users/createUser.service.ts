import { User } from "../../entities/users.entity";
import AppDataSource from "../../data-source";
import { IUser, IUserRequest } from "../../interfaces/users";
import bcrypt from "bcryptjs"
import ErrorHTTP from "../../errors/ErrorHTTP";

const createUserService = async ({name, email, password, isAdm}: IUserRequest): Promise<IUser> => {
    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const emailAlreadyExist = users.find(user => user.email === email)

    if(emailAlreadyExist){
        throw new ErrorHTTP("Email already exists", 400)
    }

    

    const user = new User()
    user.name = name
    user.email = email
    user.password = bcrypt.hashSync(password, 10)
    user.isAdm = isAdm
    user.isActive = true
    user.createdAt = new Date()
    user.updatedAt = new Date()

    userRepository.create(user)
    await userRepository.save(user)

    const userToReturn: IUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdm: user.isAdm,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }

    return userToReturn
}

export default createUserService