import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { get_Countries } from "../../Redux/Actions";
import fondo from '../../img/5fa43d71a111f.jpeg'
import boton from '../../img/boton.png'
import './Login.css'


function Login(){
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(get_Countries())
        fetch('http://localhost:3001/auth/login',{
            credentials:'include'
        })
        .then((descarga)=>descarga.json())
        .then((respuesta)=>{
            setStatus(respuesta.status)
        })
    }, []);
    //LOGIN
    const [status,setStatus]=useState()
    const [mensaje,setMensaje]=useState()
    const [login,setLogin]=useState({
        email:"",
        password:""
    })

    const [register,setRegister]=useState({
        name:"",
        email:"",
        password:""
    })    

    function cambio(arg){
        setStatus(arg)
        setMensaje("")
        setLogin({email:"",password:""})
        setRegister({name:"",email:"",password:""})
    }
    function postLogin(e){        
        e.preventDefault()
        fetch(`http://localhost:3001/auth/login`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            credentials:'include',
            body: JSON.stringify(login)
        })
        .then((descarga)=> descarga.json())
        .then((respuesta)=>{        
            if(respuesta.status===false){setMensaje(respuesta.message)}
            if(respuesta.status===true){setStatus(true)}
        })
        

    }
    function postRegister(e){
        e.preventDefault()
        fetch(`http://localhost:3001/auth/register`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(register)
        })
        .then((descarga)=> descarga.json())
        .then((respuesta)=>{
            alert(respuesta.message)
            if(respuesta.status===true){cambio('login')}
        })
    }
    return(
        <div className="login">
            <img alt="mundo con monumentos"className="fondo"src={fondo}/>
            {status!==true?(
                status==='register'?(
                    <form className="registerForm" onSubmit={e=>postRegister(e)}>
                    <input placeholder="User name" type="text" value={register.name} required onChange={e=>setRegister({...register,name:e.target.value})}></input>
                    <input placeholder="Email" type="email" value={register.email} required onChange={e=>setRegister({...register,email:e.target.value})}></input>
                    <input placeholder="Password" type="password" value={register.password} required onChange={e=>setRegister({...register,password:e.target.value})}></input>
                    <p style={{cursor:"pointer", width:100+"px"}} onClick={e=>cambio('login')}>Already have an account?</p>
                    <p style={{color:"red"}}>{mensaje}</p>
                    <button>Register!</button>
                    </form>                                     
                ):(     
                    <form className="loginForm" onSubmit={e=>postLogin(e)}>
                    <input placeholder="Email" type="email" value={login.email} required onChange={e=>setLogin({...login,email:e.target.value})}></input>
                    <input placeholder="Password" type="password" value={login.password} required onChange={e=>setLogin({...login,password:e.target.value})}></input>
                    <p style={{color:"red"}}>{mensaje}</p>
                    <p style={{cursor:"pointer", width:95+"px"}} onClick={e=>cambio('register')}>Sing Up now</p>
                    <button>Login!</button>
                </form>
                )
            ):
            (<Link  to='/home'>
                <img alt="lets fly"className="btn" src={boton}/>entrar</Link>
            )}
        </div>
    )
}

export default Login