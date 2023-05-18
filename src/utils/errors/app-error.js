class AppError extends Error{   //Error is an inbuild class
    constructor(message,StatusCode){
        super(message);
        this.StatusCode = StatusCode;
        this.explaination = message;
    }
}
module.exports = AppError;