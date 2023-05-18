const CrudRepository = require('./crud-repository');
const {City} = require('../models');

class CityRepository extends CrudRepository {
    constructor(){
        super(City);   //model(airplane) is going into crudrepository class present in crud-repository.js
    }
    
}
module.exports = CityRepository