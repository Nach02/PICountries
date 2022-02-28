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
    // try{
    //     const crear=await req.body.season.map((c)=>{
    //         Season.findOrCreate({})
    //     })

    // }catch{} 
    try{
    var {name,dificulty,duration,season,countries}=req.body;
    var alpha=/^[a-zA-Z0-9]+$/;//como añado la "Ñ"
    if(!alpha.test(name) || typeof name !=="string"){res.status(500).send('el nombre de la actividad solamente puede incluir letras o numeros')}
        else{
        if(dificulty!=="1" && dificulty!=="2" && dificulty!=="3" && dificulty!=="4" && dificulty!=="5"){res.status(500).send('la dificultad debe ser una escala de 1-5')}
            else{
                if(season!=="Summer" && season!=="Autumn" && season!=="Winter" && season!=="Spring"){res.status(500).send('season must be one of Summer, Autumn, Winter or Spring')}
                else{
                    if(typeof duration!=="number"){res.status(500).send('activity duration must be a number')}
                    else{
                    const [newActivity,created]= await Activity.findOrCreate({
                        where:{
                            name,
                            dificulty,
                            duration,
                            season
                        }
                    })
                    const link= await newActivity.addCountries(countries)    
                    res.send(newActivity)
                    }
                }
            }
        }
    }catch{res.status(500).send('error en el servidor, alguno de los paises seleccionados no se encuentra en la base de datos')}        
})