import React,{useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { get_Details } from "../../Redux/Actions";
import {Link} from 'react-router-dom'


function Detalle(props){
    const dispatch=useDispatch();
    const state=useSelector((state)=>state)


    useEffect(() => {
        dispatch(get_Details(props.match.params.id))
    }, []);

    const detalles=state.countryDetails
    const [pais]=state.countries.filter(c=>c.id===parseInt(props.match.params.id))
    console.log(detalles.activities)
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

    return (
        <div>
            <h3>Continent: {pais.continent}</h3>
            <img src={pais.img}/>
            <h1>{pais.name}</h1>            
            <h3>{detalles.ID}</h3>
            {detalles.activities?(
            detalles.activities.length<1?(
                <p>This country has no activities yet, <Link to="/home/form">Create one now!</Link></p>):
                (
                    detalles.activities.map(a=>(
                    <div key={a.name}>
                        <h2>name={a.name}</h2>
                        <h2>duration={a.duration}</h2>
                        <h2>season={a.season}</h2>
                        <h2>dificulty={dificultad}</h2>
                    </div>
                ))
                )
            ):(<></>)}
            <h3>Area: {detalles.area}</h3>
            <h2>Capital: {detalles.capitalCity}</h2>
            <h3>Population: {detalles.population}</h3>
            <h2>Subregion: {detalles.subregion}</h2>
        </div>
    )
}

export default Detalle