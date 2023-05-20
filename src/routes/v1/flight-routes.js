const express = require('express');
const {FlightController} = require('../../controllers');
const {FlightMiddlewares} = require('../../middlewares');
const router = express.Router();


//  /api/v1/flights   POST request
router.post('/',FlightMiddlewares.validateCreateRequest ,FlightController.createFlight);



module.exports = router;
