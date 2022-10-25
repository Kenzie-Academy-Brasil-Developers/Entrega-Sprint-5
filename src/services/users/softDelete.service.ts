import { User } from "../../entities/users.entity";
import AppDataSource from "../../data-source";
import ErrorHTTP from "../../errors/ErrorHTTP";

const softDeleteService = async (id: string): Promise<boolean> => {
    const userRepository = AppDataSource.getRepository(User)
    
    const users = await userRepository.find()

    const account = users.find(user => user.id === id)

    if(!account){
        return false
    }

    if(!account.isActive){
        throw new ErrorHTTP("User is alredy inactive", 400)
    }

    await userRepository.update(account.id, {
        isActive: false
    })

    return true
}

export default softDeleteService