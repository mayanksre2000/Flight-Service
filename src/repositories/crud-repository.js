const {StatusCodes} = require('http-status-codes'); 
const {logger } = require('../config');
class CrudRepository{
    constructor(model) {
        this.model = model;
    }
    async create(data) // using orm method to add data in our databse
    {      
            const response = await this.model.create(data);
            return response;
       
    }
    async destroy(data) // using orm method to delete data in our databse
    {
 
        const response = await this.model.destroy({
            where:{                          // like we do in sql delete from    'where'
                id :data 
            }
        });
        if (!response){
            throw new AppError('not Able to find resource or plane',StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async get(data) // using orm method to get data in our databse
    {
        const response = await this.model.findByPk(data);
        if (!response){
            throw new AppError('not Able to find resource or plane',StatusCodes.NOT_FOUND);
        }
        return response;
        
    }
    async getAll() // using orm method to get all data in our databse
    {
        
        const response = await this.model.findAll();
        return response;
        
        }
    async update(id,data) // using orm method to updata data in our databse with primary key id and data is an object ->{col:value,..}
    {
            const response = await this.model.update(data,{
                where:{
                    id:id
                }
            });
            return response;
       
            
        }
    }


module.exports = CrudRepository