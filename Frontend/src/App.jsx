import React, { Suspense, lazy } from "react";


import Navbar from './Components/Navbar/Navbar'
import { Route, Router, Routes } from 'react-router-dom'
const Home = lazy(()=>import( './Pages/Home/Home'))
const Cart =  lazy(()=>import( './Pages/Cart/Cart'))
const PlaceOrder  = lazy(()=> import( './Pages/PlaceOrder/PlaceOrder'))
import Footer from './Components/Footer/Footer'
import AppDownload from './Components/AppDownload/AppDownload'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import Chatbot from './Components/Chatbot/Chatbot'
import "./App.css"
const Moodboat = lazy(()=>import( './Components/MoodBoat/Moodboat'))
const Foodspred  = lazy(()=>import('./Components/OtherServices/Foodspred'))
const Verify = lazy(()=> import( './Pages/Verify/Verify'))
const PaymentFailed = lazy(()=> import( './Pages/Verify/Failed'))
const MyOrders = lazy(()=>import('./Pages/PlaceOrder/MyOrders'))

 
 

const App = () => {
  const[showLogin,setShowLogin]=React.useState(false)
  return (
    <>
 
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='App'>
      
<Navbar setShowLogin={setShowLogin}/>    
<Suspense fallback={<div className="page-loader"></div>}>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/cart' element={<Cart/>}/>
  <Route path='/order' element={<PlaceOrder/>}/>
  <Route path='/Verify' element={<Verify/>}/>
  <Route path='/failed' element={<PaymentFailed/>}/>
  <Route path='/myorders' element={<MyOrders/>}/>
  <Route path='/login' element={<LoginPopup setShowLogin={setShowLogin}/>}/>
</Routes>
<Chatbot/>
<Moodboat/>
</Suspense>
<Foodspred/>
<Footer/>

    </div>
    </>
  )
}

export default App
