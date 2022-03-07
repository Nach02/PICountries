import React,{useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import { NavLink } from "react-router-dom";
import { post_Activity } from "../../Redux/Actions";
import x from '../../img/nuevas.png';
import avion from '../../img/avion.png';
import pasaporte from '../../img/pasaporte.png'
import barras from '../../img/barras.png'
import './Form.css'

function Form(){
    const state=useSelector((state)=>state)
    const dispatch=useDispatch()
    const [errors,setErrors]=useState({});    
    const [select,setSelect]=useState({
        id:[],
        name:[]
    })

    function selectCountry(e){
        validar()
        if(!select.id.includes(e.target.value)){
            var [x]=state.countries.filter(c=>c.id===parseInt(e.target.value))
            setSelect({
                id:[...select.id,e.target.value],
                name:[...select.name,x.name]
            })
        }
    }    

    function validar(e){
        var errores={}
        var activity=document.getElementById('activity')  
        var duration=document.getElementById('duration')
        var season=document.getElementById('season')
        var countries=select
        var alpha=/^[a-zA-ZÀ-ÿ\u00f1\u00d10-9]+$/;
        if(!alpha.test(activity.value)){
            errores.activity="symbol"
            //setErrors({[e.target.id]:"symbol"})
        }else {if(activity.value===""){errores.activity="name"}}

        if(duration.value===""){errores.duration="name"}
        if(season.value===""){errores.season="name"}
        if(countries.id.length<1){errores.countries="name"}
        setErrors(errores)
    }

    function send(){        
        var activity=document.getElementById('activity')        
        var dificulty=document.getElementById('dificulty')
        var duration=document.getElementById('duration')
        var season=document.getElementById('season')
        var countries=select
        validar()
        if(errors.activity===undefined &&activity.value!==""&&countries.id.length>0
        &&duration.value!==""&&season.value!==""){
            dispatch(post_Activity({
                name:activity.value,
                dificulty:dificulty.value,
                duration:duration.value,
                season:season.value,
                countries:countries.id}))
            window.location.href = 'http://localhost:3000/home';
        }else{
            alert("faltan alguna informacion") 
        } 
    }

    return(
        <div className="total">
            <img className="fondoNuevo"src={x}/>
            <form className="form">
                <div className="activity">
                <label>Activity name</label>
                <input id="activity" type="text" placeholder="alphanumeric only" onChange={validar}></input>
                </div>
                <div className="activiyAlert">
                {errors.activity?<span className="alert">Activity must have a name without any symbol</span>:<></>}
                </div>
                <img className="barras" src={barras}/>
                <div className="dificulty">                
                <label>Dificulty</label>
                <input id="dificulty" type="range" min="1" max="5"></input>
                </div>
                <div className="duration">
                <label>Duration</label>
                <select id="duration" onChange={validar}>
                    <option value="" defaultValue hidden>duration</option>
                    <option value='0-30 Minutes'>0-30 Minutes</option>
                    <option value='One Hour'>One Hour</option>
                    <option value='Two Hours'>Two Hours</option>
                    <option value='More than two hours'>More than two hours</option>                    
                </select>
                </div>
                <div className="durationAlert">
                {errors.duration?<span className="alert">no duration selected</span>:<></>}
                </div>
                <div className="season">
                <label>Season's</label>
                <select id="season" onChange={validar}>
                    <option value="" defaultValue hidden>season</option>
                    <option value='Summer'>Summer</option>
                    <option value='Spring'>Spring</option>
                    <option value='Autumn'>Autumn</option>
                    <option value='Winter'>Winter</option>                    
                </select>
                </div>
                <div className="seasonAlert">
                {errors.season?<span className="alert">no season selected</span>:<></>}
                </div>
                <div className="countries">
                <label>Where can I practice it?</label>
                <select name="countries"onChange={(e)=>selectCountry(e)}>
                    <option value="" defaultValue hidden>Country</option>
                    {state.countries?.map(c=>(
                        <option key={c.name} value={c.id}>{c.name}</option>
                    ))}
                </select>
                </div>
                <div className="countriesAlert">
                {errors.countries?<span className="alert">select some country</span>:<></>}
                </div>
                <div className="selected">
                {select.id.length>0?(
                    <ul>
                    {select.name.map(c=>(
                        <li key={c}>{c}</li>
                    ))}
                    </ul>
                ):<></>}
                </div>                
            </form>
            <button className="enviar" onClick={(e)=>send(e)}>Send</button>
            <NavLink to='/home'><img className="volver"src={avion}/></NavLink>
        </div>
    )
}

export default Form