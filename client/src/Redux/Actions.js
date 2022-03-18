
export const GET_COUNTRIES='GET_COUNTRIES'
export const GET_DETAILS='GET_DETAILS'
export const POST_ACTIVITY='POST_ACTIVITY'
export const UPDATE_ALL='UPDATE_ALL'
export const SET_PAG='SET_PAG'
export const FILTER='FILTER'
export const CLEAR_DETAILS='CLEAR_DETAILS'

const URL='http://localhost:3001'

export const get_Countries=function(){
    return function (dispatch){
        return fetch(`${URL}/countries`)
                .then((descarga)=>descarga.json())
                .then((respuesta)=>{
                    dispatch({
                        type:GET_COUNTRIES,
                        payload:respuesta
                    })
                })
                .catch((err)=>alert(`Ocurrio un error ${err}`))
    }
}

export const post_Activity=function(objeto){
    return function (dispatch){
        return fetch(`${URL}/activity`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(objeto)
        })
        .then((descarga)=> descarga.json())
        .then((respuesta)=>{
            var paises=[]
            respuesta.countries.forEach(c => {
                paises.push(c.name+" ")
            });
            alert(`The activity ${respuesta.name} it's now available in the following countries: ${paises}`)
            dispatch({
                type:POST_ACTIVITY,
                payload:respuesta
            })
        })
        .catch((err)=>alert(`Ocurrio un error ${err}`))
    }
}

export const get_Details=(id)=>dispatch=>{
    return fetch(`${URL}/countries/${id}`)
            .then((descarga)=> descarga.json())
            .then((respuesta)=>{
                dispatch({
                    type:GET_DETAILS,
                    payload:respuesta
                })
            })
            .catch((err)=>alert(`Ocurrio un error ${err}`))
}

export function set_Pag(list){
    return{
        type:SET_PAG,
        payload:list
    }
}

export function clear_Details(){
    return{
        type:CLEAR_DETAILS,        
    }
}

export function filter(search,select,sort,activity){
    return{
        type:FILTER,
        payload:{
            search:search,
            select:select,
            sort:sort,
            activity:activity
        }
    }
}
