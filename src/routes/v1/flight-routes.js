const express = require('express');
const {FlightController} = require('../../controllers');
const {FlightMiddlewares} = require('../../middlewares');
const router = express.Router();


//  /api/v1/flights   POST request
router.post('/',FlightMiddlewares.validateCreateRequest ,FlightController.createFlight);

//  /api/v1/flights?trips=MUM-DEL   GET request
router.get('/',FlightController.getAllFlights);



module.exports = router;
