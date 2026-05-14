import React, { useEffect, useState } from 'react'
 import axios from "axios"

export const StoreContext = React.createContext(null)

const StoreContextProvider = (props) =>{

    const[cartItems,setCartItems]=React.useState([])
    const url ="http://localhost:4000"
    const [token ,setToken]=React.useState("");
    const [food_list,setFoodList] = useState([])

    const addToCart=async(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
    const removefromcart= async(itemId)=>{

        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
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
const fetchFoodList = async()=>{
    const response = await axios.get(url+"/api/food/list")
    setFoodList(response.data.data)
}
     const loadcartData = async (token) =>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
setCartItems(response.data.cartData)
     }
    // isse refresh krne pr logout nhi hoga matlab token ko rakh lega  
useEffect(()=>{
    async function loadfood (){
        await fetchFoodList()
    
if(localStorage.getItem("token")){
    setToken(localStorage.getItem("token"))
    await loadcartData(localStorage.getItem("token"))
}
    }
loadfood()
},[])

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