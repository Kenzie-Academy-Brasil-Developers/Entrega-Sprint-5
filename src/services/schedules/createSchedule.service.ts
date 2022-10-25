import AppDataSource from "../../data-source";
import ErrorHTTP from "../../errors/ErrorHTTP";
import { Schedule_users_properties } from "../../entities/schedules.entity";
import { User } from "../../entities/users.entity";
import { Property } from "../../entities/properties.entity";
import { IScheduleRequest } from "../../interfaces/schedules";

const createScheduleService = async ({ date, hour, propertyId, userId }: IScheduleRequest) => {
    const schedulesRepository = AppDataSource.getRepository(Schedule_users_properties)
    const usersRepository = AppDataSource.getRepository(User)
    const propertiesRepository = AppDataSource.getRepository(Property)

    const schedules = await schedulesRepository.find()
    const users = await usersRepository.find()
    const properties = await propertiesRepository.find()

    let newDate = new Date(date)
    let day = newDate.getDay()

    if(day === 6 || day === 0){
        throw new ErrorHTTP("Can`t schedule on the weekend, remark on another day", 400)
    }

    let newHour = parseInt(hour.split(":").join(''))

    if(newHour < 800 || newHour > 1800){
        throw new ErrorHTTP("Unavailable time for schedule, remark on another hour", 400)
    }   

    const user = users.find(user => user.id === userId)
    
    if(!user){
        throw new ErrorHTTP("User not found", 404)
    }

    const property = properties.find(property => property.id === propertyId)

    if(!property){
        throw new ErrorHTTP("Property not found", 404)
    }

    const scheduleAlredyExist = schedules.find(schedule => schedule.date.toString() === newDate.toString() && schedule.hour === hour)

    console.log(scheduleAlredyExist)

    if(scheduleAlredyExist){
        throw new ErrorHTTP("Schedule already made at this day and time", 400)
    }

    const newSchedule = new Schedule_users_properties()
    newSchedule.date = newDate
    newSchedule.hour = hour
    newSchedule.user = user
    newSchedule.property = property

    schedulesRepository.create(newSchedule)
    await schedulesRepository.save(newSchedule)

    return newSchedule
}   

export default createScheduleService