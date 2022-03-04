//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios= require ('axios').default
const {Country} = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async() => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    const descarga=await axios.get('https://restcountries.com/v3/all')//precarga la BD
                        .then((response)=>{return response.data}) 
                        .catch((err)=>res.status(400).send(err))   
    if(descarga[0]!==undefined){
      const crear=await descarga.map((c)=>{
        Country.findOrCreate({
          where:{
            name:c.name.common,
            img:c.flags[0],
            continent:c.continents[0],
            population:c.population
          }      
        })
      }) 
    };
  })
}); 
