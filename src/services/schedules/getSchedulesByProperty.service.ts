import AppDataSource from "../../data-source";
import ErrorHTTP from "../../errors/ErrorHTTP";
import { Property } from "../../entities/properties.entity";
import { Schedule_users_properties } from "../../entities/schedules.entity";


const getScheduleByPropertiesService = async (id: string) => {
    const propertiesRepository = AppDataSource.getRepository(Property)
    const properties = await propertiesRepository.find()

    const foundProperty = properties.find(property => property.id === id)

    if(!foundProperty){
        throw new ErrorHTTP("Property not found", 404)
    }

    return {schedules: foundProperty.schedules}
}

export default getScheduleByPropertiesService

