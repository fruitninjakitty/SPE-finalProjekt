import axios from "axios";

export const AddItem=(item)=>async dispatch=>{
    dispatch({type:'ADD_ITEM_REQUEST'})
    try {
        const response= await axios.post('/api/additem' , {item})
        console.log(response);
        dispatch({type:'ADD_ITEM_SUCCESS'})
    } catch (error) {
        dispatch({type:'ADD_ITEM_FAILED' , payload : error})
    }
}