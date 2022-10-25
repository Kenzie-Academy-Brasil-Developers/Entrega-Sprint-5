import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entitites";
import { Property } from "../../entities/properties.entity";
import ErrorHTTP from "../../errors/ErrorHTTP";

const listPropertiesByCategoryService = async (id: string): Promise<Category> => {
    const categoryRepository = AppDataSource.getRepository(Category)
    const categories = await categoryRepository.find()

    const categoryToFind = categories.find(category => category.id === id)
    
    if(!categoryToFind){
        throw new ErrorHTTP("Category not found", 404)
    }

    return categoryToFind
}

export default listPropertiesByCategoryService