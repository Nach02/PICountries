import React,{useEffect, useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { clear_Details, get_Details } from "../../Redux/Actions";
import {NavLink,Link} from 'react-router-dom'
import fondo from '../../img/detalles.png'
import avion from '../../img/avion.png'
import './Detalle.css'


function Detalle(props){
    const dispatch=useDispatch();
    const state=useSelector((state)=>state)
    const [status,setStatus]=useState()

    
    useEffect(() => {
        dispatch(get_Details(props.match.params.id))
        fetch('http://localhost:3001/auth/user',{
            credentials:'include'
        })
        .then((descarga)=>descarga.json())
        .then((respuesta)=>{
            if(respuesta.status===false){window.location.href = 'http://localhost:3000'}
            else{
                setStatus(respuesta.status)
            }            
        })
        return dispatch(clear_Details())
    }, []);

    const detalles=state.countryDetails
    const [pais]=state.countries.filter(c=>c.id===parseInt(props.match.params.id))
    var dificultad=""
    if(detalles.activities&&detalles.activities.length>0){
        switch (detalles.activities[0].dificulty) {
            case '1':
                dificultad= "Very easy"                
                break;
            case '2':
                dificultad= "Easy"                
                break;
            case '3':
                dificultad= "Medium"                
                break;
            case '4':
                dificultad= "Hard"                
                break;
        
            default:
                dificultad="Very hard"
                break;
        }
    }

    var area;
    if(detalles.area){
    if(detalles.area>1000000){area= (detalles.area/1000000).toFixed(2).toString().concat("M Km2")}
    else{area=detalles.area.toString().concat("Km2")}
    }
    if(status===true){
    return (
        <div className="main">
            <img className="fo" alt ="valija vacia"src={fondo}/>
            <p className="co">Continent: {pais.continent}</p>
            <img className="fl" alt="bandera del pais" src={pais.img}/>
            <p className="na">{pais.name}</p>            
            <p className="ID">{detalles.ID}</p>
            <div className="activities">
            {detalles.activities?(
            detalles.activities.length<1?(
                <p className="actAlert">This country has no activities yet, <Link to="/home/form">Create one now!</Link></p>):
                (
                    detalles.activities.map(a=>(
                    <div className="acividad" key={a.name}>
                        <h2 style={{height:0+"px"}}>{a.name}</h2>
                        <h2 style={{height:0+"px"}}>{a.duration}</h2>
                        <h2 style={{height:0+"px"}}>{a.season}</h2>
                        <h2 style={{height:0+"px"}}>{dificultad}</h2>
                    </div>
                ))
                )
            ):(<></>)}
            </div>
            <p className="ar">Area: {area}</p>
            <p className="ca">Capital: {detalles.capitalCity}</p>
            <p className="po">Population: {detalles.population}</p>
            <p className="su">Subregion: {detalles.subregion}</p>
            <NavLink to='/home'><img alt="avion"className="volverdetalle"src={avion}/></NavLink>
        </div>
    )}else{return <div></div>}
}

export default Detalle