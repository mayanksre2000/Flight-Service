const {StatusCodes} = require('http-status-codes'); 
const {AirplaneService} = require('../services');

/**
 * POST : /airplanes
 * req-body { modelNumber:'airbus320,capacity:200}
 */
const {ErrorResponse,SuccessResponse} = require('../utils/common');

async function createAirplane(req,res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber : req.body.modelNumber,
            capacity : req.body.capacity
        });
        SuccessResponse.data = airplane;
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
 * POST : /airplanes
 * req-body { modelNumber:'airbus320,capacity:200}
 */
async function getAirplanes(req,res){
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;
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
 * POST : /airplanes/:id
 * req-body { modelNumber:'airbus320,capacity:200}
 */
async function getAirplane(req,res){
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data = airplane;
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
 * DELETE : /airplanes/:id
 * req-body { modelNumber:'airbus320,capacity:200}
 */
async function destroyAirplane(req,res){
    try {
        const airplanes = await AirplaneService.destroyAirplane(req.params.id  );
        SuccessResponse.data = airplanes;
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
module.exports = {createAirplane,
                  getAirplanes,
                  getAirplane,
                  destroyAirplane
                  };  