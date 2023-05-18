const {StatusCodes} = require('http-status-codes'); 
const {CityService} = require('../services');
const {ErrorResponse,SuccessResponse} = require('../utils/common'); 

/**
 * POST : /cities
 * req-body { name:London}
 */
async function createCity(req,res) {

    try {
        const city = await CityService.createCity({
            name : req.body.name
        });
        SuccessResponse.data = city;
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
async function getCity(req,res){
    try {
        const city = await CityService.getCity(req.params.id);
        SuccessResponse.data = city;
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
module.exports = {
    createCity,
    getCity
}