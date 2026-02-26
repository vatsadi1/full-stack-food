import React from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext';
function PlaceOrder() {
  const{ getTotalCartAmount } = React.useContext(StoreContext);
  return (
     <form className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className="multi-field">
          <input type="text" placeholder='First name' />
          <input type="text" placeholder='Last name'/>
          </div>
           <div className="multi-field">
          <input type="text" placeholder='Email address' />
          <input type="text" placeholder='street'/>
          </div>
           <div className="multi-field">
          <input type="text" placeholder='city' />
          <input type="text" placeholder='state'/>
          </div>
           <div className="multi-field">
          <input type="text" placeholder='Zipcode' />
          <input type="text" placeholder='Country'/>
          </div>
          <input type='text' placeholder='Phone number'/>
        </div>
        <div className='place-order-right'>
           <div className='cart-total'>
          <h2>card Totals</h2>
          <div className='cart-total-details'>
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr/>
          <div className='cart-total-details'>
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
              </div>
      <hr/>
              <button  >PROCEED TO PAY</button>
        </div>
          </div>
     </form>
  )
}

export default PlaceOrder
