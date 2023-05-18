const {StatusCodes} = require('http-status-codes'); 
const {AirportService} = require('../services');

/**
 * POST : /airports
 * req-body { name:'IGI',cityId:5,code:'DEL}
 */
const {ErrorResponse,SuccessResponse} = require('../utils/common');
const { CityMiddlewares } = require('../middlewares');

async function createAirport(req,res) {
    try {
        const airport = await AirportService.createAirport({
            name : req.body.name,
            code : req.body.code,
            address : req.body.address,
            cityId :  req.body.cityId 
        });
        SuccessResponse.data = airport;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
         
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.BAD_REQUEST)  // ----------change here if error occurs ,error.statusCode likha hai video mein toh
                .json(ErrorResponse);

    }        

}
/**
 * POST : /airports
 */
async function getAirports(req,res){
    try {
        const airports = await AirportService.getAirports();
        SuccessResponse.data = airports;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.BAD_REQUEST)  // ----------change here if error occurs ,error.statusCode likha hai video mein toh
                .json(ErrorResponse);
    }
}
/**
 * POST : /airports/:id
 * req-body { modelNumber:'airbus320,capacity:200}
 */
async function getAirport(req,res){
    try {
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.data = airport;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.BAD_REQUEST)  // ----------change here if error occurs ,error.statusCode likha hai video mein toh
                .json(ErrorResponse);
    }
}   
/**
 * DELETE : /airports/:id
 * req-body { modelNumber:'airbus320,capacity:200}
 */
async function destroyAirport(req,res){
    try {
        const airports = await AirportService.destroyAirport(req.params.id  );
        SuccessResponse.data = airports;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.BAD_REQUEST)  // ----------change here if error occurs ,error.statusCode likha hai video mein toh
                .json(ErrorResponse);
    }
}
module.exports = {createAirport,
                  getAirports,
                  getAirport,
                  destroyAirport
                  };  