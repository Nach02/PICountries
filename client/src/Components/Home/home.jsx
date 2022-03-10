import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import fondo from '../../img/fondo valijas 2.jpg'
import './home.css';
import { useSelector,useDispatch } from "react-redux";
import { set_Pag,filter,get_Countries } from "../../Redux/Actions";

function Home(){
    const state=useSelector((state)=>state)
    const dispatch=useDispatch()
    const [status,setStatus]=useState()
    
    useEffect(() => {
        dispatch(get_Countries())
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
    useEffect(()=>{
        pag()
    },[state.filter])
    useEffect(() => { 
        dispatch(filter())  
    }, [state.countries]);

    var pageElements=9;
    let pages=Math.ceil(state.filter.length/pageElements)
    let array=[];
    for(let i=1;i<=pages;i++){
        array.push(parseInt(i))
    }
    if(typeof state.filter==="string") {array=[]}

    function pag(page=1){
        var list=[]
        var x=(page*pageElements)-pageElements
        if(page!=1){
            pageElements=10
        }
        for(let i=x;i<x+pageElements;i++){
            if(state.filter[i]!==undefined){
                list.push(state.filter[i])
            }
        }
        dispatch(set_Pag(list));
    }
    
    if(status===true){
    return(        
        <div style={{height:621+"px"}}>
            <img className="fondohome" src={fondo}/>
            <NavBar />
            <div className="paginado">
                {array.map(c=>(
                    <p key={c} className="page"><u onClick={(e)=>{pag(parseInt(e.target.textContent))}}>{c}</u></p>
                ))}

            </div>            
            <Cards />
        </div>
    )}else{return <div></div>}

}

export default Home;