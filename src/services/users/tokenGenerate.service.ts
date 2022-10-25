import { User } from "../../entities/users.entity";
import AppDataSource from "../../data-source";
import jwt from "jsonwebtoken"
import { IUserLogin } from "../../interfaces/users";
import bcrypt from "bcryptjs"
import ErrorHTTP from "../../errors/ErrorHTTP";

const tokenGenerateService = async ({email, password}: IUserLogin): Promise<string> => {

    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    const user = users.find((user) => user.email === email)

    if(!user){
        throw new ErrorHTTP("Wrong email or password", 403)
    }
    
    const passwordMatch = bcrypt.compareSync(password, user.password)

    if(!passwordMatch){
        throw new ErrorHTTP("Wrong email or password", 403)
    }

    const token = jwt.sign(
        {
            email: email,
            isAdm: user.isAdm,
            id: user.id
        },
        String(process.env.SECRET_KEY),
        {expiresIn: '24h'}
    )  

    return token
}

export default tokenGenerateService

