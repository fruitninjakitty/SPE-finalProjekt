import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {

    //yahi syntax hai switch ka yaha 
    switch (action.type) {
        case "ADD":
            //isse related code card.js me upar hai
            return [...state, { id: action.id, name: action.name, qty: action.qty, price: action.price, img: action.img,total: action.total }]
        case "REMOVE":
            return state.filter((item, index) => index !== action.index);
        case "DROP":
            let emptyArray = []
            return emptyArray;
        case "UPDATE":
            return state.map((food) => {
                if (food.id === action.id) {
                    return { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return food;
            });

        default:
            console.log("error in reducer");
    }

}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, [])
    return (

        <CartDispatchContext.Provider value={dispatch}>

            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>

        </CartDispatchContext.Provider>

    )

}

export const addItemReducer=(state={ } , action)=>{

    switch(action.type)
    {
        case 'ADD_ITEM_REQUEST' : return{
            loading : true,
            ...state
        }
        case 'ADD_ITEM_SUCCESS' : return{
            loading : false ,
            success : true,
        }
        case 'ADD_ITEM_FAILED' : return{
            error : action.payload ,
            loading : false
        }
        default : return state
    }

}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
