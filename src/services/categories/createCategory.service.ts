import { Category } from "../../entities/categories.entitites";
import AppDataSource from "../../data-source";
import { ICategoryRequest } from "../../interfaces/categories";
import ErrorHTTP from "../../errors/ErrorHTTP";


const createCategoryService = async ({name}: ICategoryRequest): Promise<Category> => {
    const categoryRepository = AppDataSource.getRepository(Category)

    const categories = await categoryRepository.find()

    const categoryAlreadyExist = categories.find(category => category.name === name)

    if(categoryAlreadyExist){
        throw new ErrorHTTP("Category already exist", 400)
    }

    const category = new Category()
    category.name = name

    categoryRepository.create(category)
    await categoryRepository.save(category)

    return category

}

export default createCategoryService
