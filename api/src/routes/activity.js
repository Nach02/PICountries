var express = require('express');
var router = express.Router();
module.exports = router;
const { Country, Activity,Season } = require('../db.js')

// escriban sus rutas acá
router.get('/',async function(req,res){
    const all= await Activity.findAll({
        include:Country,
    })
    if(all.length<1){res.status(404).send("no se econtraron actividades en la base de datos")}
    else{res.send(all)}    
})

router.post('/',async function(req,res){    
    try{
    var {name,dificulty,duration,season,countries}=req.body;
    var alpha=/^[a-zA-ZÀ-ÿ\u00f1\u00d10-9]+$/;//como añado la "Ñ"
    if(!alpha.test(name) || typeof name !=="string"){res.status(501).send('activity name must br Alphanumeric only')}
        else{
        if(dificulty!=="1" && dificulty!=="2" && dificulty!=="3" && dificulty!=="4" && dificulty!=="5"){res.status(502).send('activity dificulty must be a number between 1 to 5')}
            else{
                if(season!=="Summer" && season!=="Autumn" && season!=="Winter" && season!=="Spring"){res.status(503).send('season must be one of Summer, Autumn, Winter or Spring')}
                else{
                    const [newActivity,created]= await Activity.findOrCreate({
                        where:{
                            name,
                            dificulty,
                            duration,
                            season
                        },
                        include:Country
                    })
                    newActivity.countries?.forEach(c => {
                        if(!countries.includes(c.id.toString())){countries.push(c.id)}
                    });
                    const link= await newActivity.setCountries(countries)  
                    const [result]=await Activity.findAll({
                        where:{
                            name,
                            dificulty,
                            duration,
                            season
                        },
                        include:Country
                    })  
                    res.send(result)                    
                }
            }
        }
    }catch{res.status(504).send('error en el servidor, alguno de los paises seleccionados no se encuentra en la base de datos')}        
})