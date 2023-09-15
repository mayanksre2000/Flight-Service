const CrudRepository = require('./crud-repository');
const { Flight } = require('../models');
const { Airplane } = require('../models');
const { Airport } = require('../models');
const { City } = require('../models');
const {Sequelize,Op } = require('sequelize');
const db = require('../models');
const { addRowLockOnFlights } = require('./queries');


class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter,sort){
        const response = await Flight.findAll({   //find all iS like SELECT on queries we give
            where : filter,
            order: sort,
            include: [    //include means adding things in response
                {
                    model: Airplane, // to map flight model with airplane model
                    // so its like join on airplane and flight with filter on like pk(airplane.id = flight.id) as given in models airplane has many flights
                    required: true,  //(airplane.id = flight.id)
                    as: 'airplaneDetail',    // we have stated it in models also (means how it is gonna name here) --- an alias(to state which  association you want to refer )
                },
                {
                    model: Airport,   // Model is just just used for JOIN queries
                    required: true,
                    as: 'departureAirport',  // we have stated it in models also (means how it is gonna name here)--an alias(to state which  association you want to refer )
                    on : {  //we are stating which things(on what columns) should be compared in flight and airport else it takes primary keys as default
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                    }, 
                     include: {
                        model: City,
                         required: true
                     }
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on : {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                }
            ]
        });
        return response;
    }
    async updateRemainingSeats(flightId, seats, dec = true) {
        const transaction = await db.sequelize.transaction();
        try {
            await db.sequelize.query(addRowLockOnFlights(flightId));
            const flight = await Flight.findByPk(flightId);
            if(+dec) {
                await flight.decrement('totalSeats', {by: seats}, {transaction: transaction});
            } else {
                await flight.increment('totalSeats', {by: seats}, {transaction: transaction});
            }
            await transaction.commit();
            return flight;
        } catch(error) {
            await transaction.rollback();
            throw error; 
        }
       
    }
}

module.exports = FlightRepository;
