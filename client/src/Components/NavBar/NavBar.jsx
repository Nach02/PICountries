import React,{useState,useEffect} from "react";
import { Link, NavLink } from "react-router-dom";
import './NavBar.css'
import { useSelector,useDispatch } from "react-redux";
import { filter } from "../../Redux/Actions";

function NavBar(){
    const [cont,setCont]=useState([])
    const [activ,setActiv]=useState([])
    const state=useSelector((state)=>state)
    const dispatch=useDispatch()

    useEffect(() => {
        setContinent();
        setActivity();
    }, [state.filter]);


    function setContinent(){
        var x=[]        
        if(typeof state.countries!=="string"){
            for(let i=0;i<state.countries.length;i++){          
                if(!x.includes((state.countries[i].continent).trim())){x.push(state.countries[i].continent)}            
            }    
            setCont(x)
        }
    }
    function setActivity(){
        var x=[]        
        for(let i=0;i<state.countries.length;i++){          
            if(state.countries[i].activities.length>0){
                for(let j=0;j<state.countries[i].activities.length;j++){
                if(!x.includes((state.countries[i].activities[j].name).trim())){x.push(state.countries[i].activities[j].name)}
                }
            } 
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
        var activity=document.getElementById("activ")
        activity=activity.value
        dispatch(filter(search,select,sort,activity))  
    }

    return(
        <div className="navBar">
            <h1 className="titulo"></h1>
            <div className="filtrado">
                <input id="search" type='text' placeholder="busca aca un pais por nombre" onChange={(e)=>handleFilter(e)}></input>
                <select id="select" name="select" onChange={(e)=>handleFilter(e)}>
                    <option value="" defaultValue hidden>Select by Continent</option>
                    {cont?.map(s=>(
                        <option key={s} value={s}>{s}</option>
                    ))}
                    <option value="">All</option>
                </select>
                <select id="activ" name="activ" onChange={(e)=>handleFilter(e)}>
                    <option value="" defaultValue hidden>Select by Activity</option>
                    {activ?.map(a=>(
                        <option key={a}value={a}>{a}</option>
                    ))}
                    <option value="">All</option>
                </select>
                
                <select id="sort" name="sort" onChange={(e)=>handleFilter(e)}>
                    <option value="name,desc">A-Z</option>
                    <option value="name,asec">Z-A</option>                        
                    <option value="population,asec">max-min</option>
                    <option value="population,desc">min-max</option>
                    <option value="" defaultValue hidden>Sort</option>
                </select>
                <button><NavLink to="/home/form">Add activity</NavLink></button>
                <button><Link to="/">LogOut</Link></button>
            </div>          
            </div>
    )
}

export default NavBar;