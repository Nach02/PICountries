import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { get_Countries } from "../../Redux/Actions";
import fondo from '../../img/5fa43d71a111f.jpeg'
import './Login.css'


console.log("login")
function Login(){
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(get_Countries())
    }, []);

    return(
        <div className="login">
            <img className="fondo"src={fondo}/>
            <Link className="btn" to='/home'>entrar</Link>
        </div>
    )
}

export default Login