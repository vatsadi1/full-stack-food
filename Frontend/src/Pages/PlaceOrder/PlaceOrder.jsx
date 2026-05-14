import React, {  useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
function PlaceOrder() {
  const{ getTotalCartAmount,token,food_list,cartItems,url } = React.useContext(StoreContext);
const navigate = useNavigate();
  const [data , setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

const onchangehandler = (event)=>{
  const name = event.target.name;
  const value = event.target.value

  setData({...data,[name]:value})
}

const placeOrder = async (event) => {
  event.preventDefault();

  const orderItems = food_list
    .filter(item => cartItems[item._id] > 0)
    .map(item => ({
      ...item,
      quantity: cartItems[item._id]
    }));

  const orderData = {
    address: data,
    items: orderItems,
    amount: getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2
  };

  let response = await axios.post(
    url + "/api/order/place",
    orderData,
    {
      headers: { token }
    }
  );

  
 

  if (response.data.success) {
    const { order, orderId } = response.data;
   const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: order.amount,
  currency: "INR",
  order_id: order.id,
  name: "Foodsy",
  description: "Food Order Payment",
  prefill: {
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    contact: data.phone
  },

  handler: async function (res) {

    try {

      const verifyRes = await axios.post(
        url + "/api/order/verify",
        {
          razorpay_order_id: res.razorpay_order_id,
          razorpay_payment_id: res.razorpay_payment_id,
          razorpay_signature: res.razorpay_signature,
          orderId
        },
        {
          headers: { token }
        }
      );

      if (verifyRes.data.success) {
        window.location.href = "/verify";
      } else {
        window.location.href = "/failed";
      }

    } catch (err) {
      console.log(err);
      alert("Verification error");
    }
  }
};


    const rzp = new window.Razorpay(options);

rzp.on("payment.failed", async function (response) {

  console.log(response);

  try {

    await axios.post(
      url + "/api/order/verify",
      {
        orderId
      },
      {
        headers: { token }
      }
    );

    rzp.close();

    setTimeout(() => {
      window.location.href = "/failed";
    }, 500);

  } catch (err) {

    console.log(err);
  }
});
    rzp.open();

  } else {
    alert("Error placing order");
  }
};



 useEffect(() => {

  if (!token) {
    navigate("/cart");
  } 
  else if (getTotalCartAmount() === 0) {
    navigate("/cart");
  }
}, [token]);

  return (
     <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className="multi-field">
          <input required type="text" name="firstName" onChange={onchangehandler} value={data.firstName}placeholder='First name' />
          <input required type="text" name="lastName" onChange={onchangehandler} value={data.lastName} placeholder='Last name'/>
          </div>
           <div className="multi-field">
          <input required type="text" name="email" onChange={onchangehandler} value={data.email} placeholder='Email address' />
          <input required type="text" name="street" onChange={onchangehandler} value={data.street} placeholder='street'/>
          </div>
           <div className="multi-field">
          <input required type="text" name="city" onChange={onchangehandler} value={data.city} placeholder='city' />
          <input required type="text"name="state" onChange={onchangehandler} value={data.state} placeholder='state'/>
          </div>
           <div className="multi-field">
          <input required type="text" name="zipcode" onChange={onchangehandler} value={data.zipcode} placeholder='Zipcode' />
          <input required type="text"name="country" onChange={onchangehandler} value={data.country}  placeholder='Country'/>
          </div>
          <input required type='text' name="phone" onChange={onchangehandler} value={data.phone} placeholder='Phone number'/>
        </div>
        <div className='place-order-right'>
           <div className='cart-total'>
          <h2>card Totals</h2>
          <div className='cart-total-details'>
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr/>
          <div className='cart-total-details'>
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <b>Total</b>
              <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
              </div>
      <hr/>
              <button  >PROCEED TO PAY</button>
        </div>
          </div>
     </form>
  )
}

export default PlaceOrder
