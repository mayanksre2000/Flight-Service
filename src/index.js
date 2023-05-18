const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');



const app = express();


app.use(express.json()); // its very imp. as from this only we are able to take body as json
app.use(express.urlencoded({extended:true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async() => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    const {City,Airport} = require('./models');
    // await City.destroy({
    //     where:{
    //         id:4
    //     }
    // });
    // const city = await City.findByPk(4);
    // await city.createAirport({name:'Indore Airport',code:'IND'}); 
    //------the above commneted lines work
    


});
