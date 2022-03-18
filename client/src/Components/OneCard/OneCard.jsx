import React from "react";
import { NavLink } from "react-router-dom";
import './OneCard.css'
import valija from '../../img/valija.png'


function OneCard(props){
    var nombre;
    if(props.name.length>15){
        nombre=props.name.substring(0,15).concat("...")

    }else{nombre=props.name}
    return(
        <NavLink className="oneCard" to={`/home/country/${props.id}`}> 
            <img alt="valija cerrada" className="valija" src={valija}/> 
            <div className="information">
                <img alt="bandera del pais"className="img" src={props.flag}/>
                <h2 className="name">{nombre}</h2>
                <h3 className="continent" >{props.continent}</h3> 
            </div>              
                
        </NavLink>
    )
}

export default OneCard