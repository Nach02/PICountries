import {CLEAR_DETAILS, FILTER, GET_COUNTRIES,GET_DETAILS,SET_PAG} from './Actions'
const initialState={
    countries:[],
    filter:[],
    pag:[],
    countryDetails:{},    
}

function order(filtro,metodo){
    return function(a,b){
        if(a[filtro]<b[filtro]){
            if(metodo==="desc"){return -1}else{return 1}
        }else if(a[filtro]>b[filtro]){
            if(metodo==="desc"){return 1}else{return -1}
        }
        return 0;
    }

}

const RootReducer=(state=initialState,action)=>{
    switch(action.type){ 
        case CLEAR_DETAILS:
            return{
                ...state,
                countryDetails:{}
            }  
        case FILTER:    
            var toAdd=[]
            if(action.payload.search!==""&&action.payload.search!==undefined){
                toAdd=state.countries.filter(c => c.name.toLowerCase().includes(action.payload.search))
            }else{
                toAdd=state.countries
            }
            if(action.payload.select!==""&&action.payload.select!==undefined){
                if(action.payload.select!=="All"){
                toAdd=toAdd.filter(c => c.continent===action.payload.select)
                }
            } 
            if(action.payload.activity!==""&&action.payload.activity!==undefined){
                if(action.payload.activity!=="All"){
                toAdd=toAdd.filter(c => {
                    for (let i = 0; i < c.activities.length; i++) {
                        if(c.activities[0].name===action.payload.activity) return true                        
                    }
                })
                }
            }
            if(action.payload.sort!==""&&action.payload.select!==undefined){
                if(action.payload.sort!=="All"){
                    toAdd=toAdd.filter(c=>c)                    
                    const [filtro,metodo]=action.payload.sort.split(",")
                    toAdd=toAdd.sort(order(filtro,metodo))
                }//else{ toAdd=toAdd}
            }
            if(toAdd.length<1){
                toAdd="No country found"
            }
            return{
                ...state,
                filter:toAdd
            }
        case SET_PAG:
            return{
                ...state,
                pag:action.payload
            }
        case GET_COUNTRIES:
            return{
                ...state,
                countries:action.payload
            }
        case GET_DETAILS:
            return{
                ...state,
                countryDetails:action.payload
            }
        default: return state;
    }
}
export default RootReducer