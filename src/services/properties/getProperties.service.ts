import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";
import ErrorHTTP from "../../errors/ErrorHTTP";

const getPropertiesService = async (): Promise<Property[]> => {
    const propertiesRepository = AppDataSource.getRepository(Property)
    const properties = await propertiesRepository.find()

    if(!properties){
        throw new ErrorHTTP("Properties not found", 404)
    }

    return properties
}

export default getPropertiesService