const express = require('express');
const {CityController} = require('../../controllers');
const router = express.Router();
const {CityMiddlewares} = require('../../middlewares');


//  /api/v1/city  POST request
router.post('/',CityMiddlewares.validateCreateRequest,CityController.createCity);

router.get('/:id',CityController.getCity);

module.exports = router;
