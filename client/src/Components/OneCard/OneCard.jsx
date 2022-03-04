import React from "react";
import { Link } from "react-router-dom";
import './OneCard.css'
import fondo from '../../img/baggage.png'

function OneCard(props){
    var nombre;
    if(props.name.length>15){
        nombre=props.name.substring(0,15).concat("...")
        console.log(nombre)

    }else{nombre=props.name}
    return(
        <Link className="oneCard" to={`/home/country/${props.id}`}>                
                <img className="img" src={props.flag}/>
                <h2 className="name">{nombre}</h2>
                <h3 className="continent" >{props.continent}</h3> 
        </Link>
    )
}

export default OneCard