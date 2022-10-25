import { Category } from "../../entities/categories.entitites";
import AppDataSource from "../../data-source";
import ErrorHTTP from "../../errors/ErrorHTTP";

const getCategoriesService = async (): Promise<Category[]> =>  {
    
    const categoryRepository = AppDataSource.getRepository(Category)
    const categories = await categoryRepository.find()

    if(!categories){
        throw new ErrorHTTP("Categories not found", 404);
    }

    return categories
}

export default getCategoriesService