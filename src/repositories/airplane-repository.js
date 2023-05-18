const CrudRepository = require('./crud-repository');
const {Airplane} = require('../models');

class AirplaneRepository extends CrudRepository {
    constructor(){
        super(Airplane);   //model(airplane) is going into crudrepository class present in crud-repository.js
    }
    
}
module.exports= AirplaneRepository