import React, { useContext } from 'react'
import axios from 'axios'
import './LoginPop.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../Context/StoreContext';
function LoginPopup({setShowLogin}) {
  const {url, setToken} = useContext(StoreContext);
    const[currState,setCurrState]=React.useState()
const [Data,setData]=React.useState({
    name:"",
    email:"",
    password:""
})

const onLogin = async(event)=>{
event.preventDefault();
let newUrl= url;
if(currState==="Login"){
  newUrl+="/api/user/login"
}
else{
  newUrl+="/api/user/register"
}

const response = await axios.post(newUrl,Data)
if(response.data.success){
setToken(response.data.token);
localStorage.setItem("token",response.data.token)
setShowLogin(false);
}

else{
  alert(response.data.message)
}
}
const handleChange=(e)=>{

  const name = e.target.name
  const value = e.target.value
  /*e → Event object hai jo input se aata hai.
e.target.name → Input ka name attribute (name/email/password)
e.target.value → Input ka current value jo user type kar raha hai
setData(data => ({ ...data, [name]: value }))
...data → Existing state ko copy kar lo
[name]: value → Jo input change hua, uska value update kar do*/
setData(data=>({...data,[name]:value}))}
 
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin}className='login-popup-container'>
        <div className='login-popup-title'>
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=""/>
        </div>
        <div className='login-popup-inputs'>
            {currState==="Login"?<></>: <input name="name" onChange={handleChange} value={Data.name}type="text" placeholder="your name" required/>}
            
            <input name="email" onChange={handleChange} value={Data.email} type="email" placeholder="your email" required/>
            <input name="password" onChange={handleChange} value={Data.password}type="password" placeholder="your password" required/>
            </div>
            <button type='submit'>{currState==="Sign up"?"create account":"Login"}</button>
            <div className='login-popup-condition'>
            <input type='checkbox' required/>
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            {currState==="Login"?<p>Create a new account? <span onClick={()=>setCurrState("Sign up")}>Click here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Click here</span></p>}
      </form>
    </div>
  )
}

export default LoginPopup
