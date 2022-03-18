import React,{useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import { NavLink } from "react-router-dom";
import { post_Activity } from "../../Redux/Actions";
import x from '../../img/nuevas.png';
import avion from '../../img/avion.png';
import barras from '../../img/barras.png'
import './Form.css'

function Form(){
    const state=useSelector((state)=>state)
    const [status,setStatus]=useState()
    const dispatch=useDispatch()
    const [errors,setErrors]=useState({});    
    const [select,setSelect]=useState({
        id:[],
        name:[]
    })
    useEffect(() => {
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
    }, []);

    function selectCountry(e){
        if(!select.id.includes(e.target.value)){
            var [x]=state.countries.filter(c=>c.id===parseInt(e.target.value))
            setSelect({
                id:[...select.id,e.target.value],
                name:[...select.name,x.name]
            })
        }
        setErrors({...errors,countries:""})
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
        }else {if(activity.value===""){errores.activity="name"}}

        if(duration.value===""){errores.duration="name"}
        if(season.value===""){errores.season="name"}
        if(countries.id.length<1){errores.countries="name"}
        setErrors(errores)
    }

    async function send(){        
        var activity=document.getElementById('activity')        
        var dificulty=document.getElementById('dificulty')
        var duration=document.getElementById('duration')
        var season=document.getElementById('season')
        var countries=select
        validar()
        if(errors.activity===undefined &&activity.value!==""&&countries.id.length>0
        &&duration.value!==""&&season.value!==""){
            await dispatch(post_Activity({
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
    function eliminar(e){
        e.preventDefault()
        var index=select.name.indexOf(e.target.value)
        select.id.splice(index,1)
        var filtrado=select.name.filter(c=>{
            if(c!==e.target.value){return true}})
        setSelect({...select,name:filtrado})        
    }

    if(status===true){
    return(
        <div className="total">
            <img alt="fondo"className="fondoNuevo"src={x}/>
            <form className="form">
                <div className="activity">
                <label>Activity name</label>
                <input id="activity" type="text" placeholder="alphanumeric only" onChange={validar}></input>
                </div>
                <div className="activiyAlert">
                {errors.activity?<span className="alert">Activity must have a name without any symbol</span>:<></>}
                </div>
                <img alt="barras de dificultad"className="barras" src={barras}/>
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
                <select name="countries"onChange={async (e)=>selectCountry(e)}>
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
                    <div>
                    {select.name.map(c=>(
                        <div key={c} style={{display:"flex",alignItems: "center"}}>
                        <p>
                            {c}
                        </p>   
                        <button value={c} onClick={e=>{eliminar(e)}} style={{margin:10+"px", height:25+"px"}}>x</button>
                        </div>
                    ))}
                    </div>
                ):<></>}
                </div>                
            </form>
            <button className="enviar" onClick={(e)=>send(e)}>Send</button>
            <NavLink to='/home'><img alt="avion"className="volver"src={avion}/></NavLink>
        </div>
    )}else{return <div></div>}
}

export default Form