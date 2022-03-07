var express = require('express');
var router = express.Router();
module.exports = router;
const {Country,Activity } = require('../db.js');
const { Sequelize,Op } = require('sequelize');

const axios= require ('axios').default

// escriban sus rutas acá

router.get('/',async function (req,res){
    if(req.query.name){
        const descarga=await axios.get(`https://restcountries.com/v3.1/name/${req.query.name}`)
                        .then((response)=>{ return response.data}) 
                        .catch((err)=>{return res.status(404).send("el pais buscado no se encuentra, revise el nombre")})
        
        if(descarga[0]!==undefined){
        for(let i=0; i<descarga.length;i++){
            const [x,created]= await Country.findOrCreate({
                where:{
                    name:descarga[i].name.common,
                    img:descarga[i].flags.svg,
                    continent:descarga[i].continents[0], 
                    population:c.population
                },
                include:Activity
            })
        }
        const paises= await Country.findAll({
            where:{
                name:{
                   [Op.iLike]: `%${req.query.name}%`
                }
            }, 
            order:[['id']],
            attributes: { exclude: ['area','ID','capitalCity','subregion'] },
            include:Activity
        })
        res.send(paises) 
        }    
    }else{
    //traerme la info de la api y guardarla en la DB
    const paises= await Country.findAll({
        order:[['id']],
        attributes: { exclude: ['area','ID','capitalCity','subregion'] },
        include:Activity
    })
    if(paises.length>0){res.send(paises)}
    }
})

router.get('/:idPais',async function (req,res){
    var cap;
    var subr;
    const id=req.params.idPais
    const country= await Country.findOne({
        where:{id},
        attributes: ['id','name'],
    });
    if(country){
    const descarga=await axios.get(`https://restcountries.com/v3.1/name/${country.name}`)
                              .then((response)=>{return response.data})
                              .catch((err)=>{  
                                return res.status(400).send("err")})
                     
        if(descarga[0]!==undefined){
        if(descarga[0].capital===undefined){cap='N/A'}else{cap=descarga[0].capital[0]}
        if(descarga[0].subregion===undefined){subr='N/A'}else{subr=descarga[0].subregion}

        country.ID=descarga[0].cca3;
        country.capitalCity=cap;
        country.subregion=subr;    
        country.area=descarga[0].area;
        country.population=descarga[0].population;
        await country.save();
        const result= await Country.findOne({
            where:{id},
            attributes: ['id','ID','capitalCity','subregion','population','area'],
            include:Activity
        })
        res.send(result)  
        }
    }else{
        console.log("4")
        res.status(404).send('el pais buscado no se encuentra en la base de datos, porfavor verifique el ID utilizado o carge un nuevo pais')
    }    
})
