const {StatusCodes} = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');
function validateCreateRequest(req,res,next) {
    if(!req.body.name){    // agar model number nahi hai body mein
        ErrorResponse.message = 'something went wrong while creating an city';
        ErrorResponse.error = new AppError(["city name not found in body"],StatusCodes.BAD_REQUEST); 
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse);
    }
    next();  //agar sab sahi hai to aage bhad jaao
};
module.exports = {
    validateCreateRequest
}