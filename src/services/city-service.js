const { StatusCodes } = require('http-status-codes');
const {CityRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

async function createCity(data){
    try{
        const city  = await cityRepository.create(data);
        return city;
     }
     catch(error){
      if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
         let explaination = [];
         error.errors.forEach((err) => {
            explaination.push(err.message);
             
         });
         throw new AppError(explaination,StatusCodes.BAD_REQUEST) ; 
         
      }
      throw new AppError('cannot create a new city object',StatusCodes.INTERNAL_SERVER_ERROR); 
     }
}
async function getCity(id){
   try {
      const city = await cityRepository.get(id);
      
      return city;
   } catch (error) {
      if (error.statusCode == StatusCodes.NOT_FOUND){
         throw new AppError('city you requested is not present',StatusCodes.error.statusCode);
      }
      throw new AppError('cannot fetch data of all the city',StatusCodes.INTERNAL_SERVER_ERROR);
   }
}
module.exports = {
createCity,
getCity
}