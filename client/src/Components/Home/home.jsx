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
    const [cont,setCont]=useState([])
    const [activ,setActiv]=useState([])
    
    useEffect(() => {
        dispatch(get_Countries())
    }, []);

    useEffect(()=>{
        pag()
    },[state.filter])
    useEffect(() => { 
        dispatch(filter())  
        setContinent()
        setActivity()     
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

    function setContinent(){
        var x=[]        
        if(typeof state.countries!=="string"){
        for(let i=0;i<state.countries.length;i++){          
            if(!x.includes((state.countries[i].continent).trim())){x.push(state.countries[i].continent)}            
            if(state.countries[i].activities.length>0){
                for(let j=0;j<state.countries[i].activities.length;j++){
                if(!x.includes((state.countries[i].activities[j].name).trim())){x.push(state.countries[i].activities[j].name)}
                }
            }
        }    
        setCont(x)
        }
    }
    function setActivity(){
        var x=[]        
        //if(typeof state.countries!=="string"){
        for(let i=0;i<state.countries.length;i++){          
            if(state.countries[i].activities.length>0){
                for(let j=0;j<state.countries[i].activities.length;j++){
                if(!x.includes((state.countries[i].activities[j].name).trim())){x.push(state.countries[i].activities[j].name)}
                }
            }
        //}    
        setActiv(x)
        }

    }
    function handleFilter(e){
        var search=document.getElementById("search")
        search=search.value
        var select=document.getElementById("select")
        select=select.value;
        var sort=document.getElementById("sort")
        sort=sort.value
        dispatch(filter(search,select,sort))  
      }


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
    )

}

export default Home;