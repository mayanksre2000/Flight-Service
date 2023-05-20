const {StatusCodes} = require('http-status-codes'); 
const {FlightService} = require('../services');

/**
 * POST : /flights
 * req-body { *  
 * flightNumber: 'UK 808',
 *  airplaneId: 'a380',
 *  departureAirportId: 12,
 *  arrivalAirportId: 11,
 *  arrivalTime: '11:10:00',
 *  departureTime: '9:10:00',
 *  price: 2000
 *  boardingGate: '12A',
 *  totalSeats: 120}
 */
const {ErrorResponse,SuccessResponse} = require('../utils/common');
const { CityMiddlewares } = require('../middlewares');

async function createFlight(req,res) {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
        SuccessResponse.data = flight;
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

module.exports = {createFlight,
                  };  