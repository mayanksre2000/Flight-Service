const { StatusCodes } = require('http-status-codes');
const {AirplaneRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { Console } = require('console');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
     try{
        const airplane = await airplaneRepository.create(data);
        return airplane;
     }
     catch(error){
      Console.log('working');
      if(error.name == 'SequelizeValidationError'){
         let explaination = [];
         error.errors.forEach((err) => {
            explaination.push(err.message);
            
         });
         throw new AppError(explaination,StatusCodes.BAD_REQUEST) ; 
         
      }
      throw new AppError('cannot create a new airplane object',StatusCodes.INTERNAL_SERVER_ERROR); 
     }
}
async function getAirplanes(){
   try {
      const airplanes = await airplaneRepository.getAll();
      return airplanes;
   } catch (error) {
      throw new AppError('cannot fetch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
   }
} 
async function getAirplane(id){
   try {
      const airplane = await airplaneRepository.get(id);
      
      return airplane;
   } catch (error) {
      if (error.statusCode == StatusCodes.NOT_FOUND){
         throw new AppError('plane you requested is not present',StatusCodes.error.statusCode);
      }
      throw new AppError('cannot fetch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
   }
}
async function destroyAirplane(id){
   try {
      const response = await airplaneRepository.destroy(id);
      
      return response;
   } catch (error) {
      if (error.statusCode == StatusCodes.NOT_FOUND){
         throw new AppError('plane you requested is not present',StatusCodes.error.statusCode);
      }
      throw new AppError('cannot fetch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
   }
}

module.exports = {
    createAirplane, 
    getAirplanes,
    getAirplane,
    destroyAirplane  
}