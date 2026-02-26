import React from 'react'
import { food_list } from '../assets/frontend_assets/assets'

export const StoreContext = React.createContext(null)

const StoreContextProvider = (props) =>{

    const[cartItems,setCartItems]=React.useState([])
    const url ="http://localhost:4000"
    const [token ,setToken]=React.useState("");
    const addToCart=(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }
    const removefromcart=(itemId)=>{

        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

     const getTotalCartAmount=()=>{
        let totalAmount=0;
        
        for(let item in cartItems){
if(cartItems[item]>0){
    let iteminfo=food_list.find((product)=>product._id===item);
            totalAmount+=iteminfo.price*cartItems[item]
        }
        }
        return totalAmount;
     }
    
    const contextValue={
food_list,
        cartItems,
        addToCart,
      removefromcart,
        setCartItems,
        getTotalCartAmount,
        url,
        token,
        setToken
        
    }
    
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider