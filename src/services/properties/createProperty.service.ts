import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";
import { Adress } from "../../entities/adresses.entity";
import ErrorHTTP from "../../errors/ErrorHTTP";
import { IAddressRequest, IPropertyRequest } from "../../interfaces/properties";
import { fixedFloat } from "../../utils";
import { Category } from "../../entities/categories.entitites";

const createPropertyService = async ({value, size, address, categoryId}: IPropertyRequest): Promise<Property> => {
    const propertyRepository = AppDataSource.getRepository(Property)
    const adressRepository = AppDataSource.getRepository(Adress)
    const categoryRepository = AppDataSource.getRepository(Category)

    const adresses = await adressRepository.find()
    const properties = await propertyRepository.find()
    const categories = await categoryRepository.find()

    const categorie = categories.find(categorie => categorie.id === categoryId)

    const anddressAlreadyExists = adresses.find(adress => adress.city === address.city && adress.district === address.district && adress.number === address.number && adress.state === address.state && adress.zipCode === address.zipCode)

    if(address.zipCode.length > 8){
        throw new ErrorHTTP("Invalid ZipCode", 400)
    }

    if(address.state.length > 2){
        throw new ErrorHTTP("Invalid State", 400)
    }

    if(anddressAlreadyExists){
        throw new ErrorHTTP("Adress already registered", 400)
    }

    if(!categorie){
        throw new ErrorHTTP("Category not found", 404)
    }

    const newAdress = new Adress()
    newAdress.zipCode = address.zipCode
    newAdress.city = address.city
    newAdress.district = address.district
    newAdress.number = address.number!
    newAdress.state = address.state

    adressRepository.create(newAdress)
    await adressRepository.save(newAdress)

    const newProperty = new Property()
    newProperty.value = fixedFloat(value)
    newProperty.size = size
    newProperty.address = newAdress
    newProperty.category = categorie

    propertyRepository.create(newProperty)
    await propertyRepository.save(newProperty)

    return newProperty

}

export default createPropertyService