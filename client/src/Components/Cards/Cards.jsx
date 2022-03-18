import React from "react";
import OneCard from "../OneCard/OneCard";
import './Cards.css'
import { useSelector } from "react-redux";
import Spinner from "../Spinner";

function Cards(){
    
    const state=useSelector((state)=>state)
    
    return (
        <div className="home">                        
            {state.countries.length>0? 
            (typeof state.pag[0]==="string"?(<h3>No country found</h3>):
                (state.pag.map(c =>(
                <OneCard key={c.id} id={c.id}continent={c.continent} name={c.name} flag={c.img}/>)                
            )))
            :
            (<Spinner/>)}
        </div>
    )
}
export default Cards;