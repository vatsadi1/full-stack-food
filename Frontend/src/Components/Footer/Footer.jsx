import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'
function Footer() {
  return (
    <div className='footer'id='footer'>
<div className='footer-content'>
    <div className="footer-content-left">
        <h1 className='span-1'>Foodsy</h1>
        <p>✨ “Deliciousness delivered to your doorstep — fast, fresh, and full of flavor.”</p>
        <div className='footer-social-icons'>
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
        </div>
    </div>
      <div className='footer-content-center'>
<h2>COMPANY</h2>
<ul>
    <li>Home</li>
    <li>About us</li>
    <li>Delivery</li>
    <li>Privacy policy</li>
</ul>
      </div>
      
      <div className='footer-content-right'>
<h2>GET IN TOUCH</h2>
<ul>
    <li>+91-56-67-890-56</li>
    <li>Contact@foodsy.com</li>
</ul>
      </div>
    </div>
<hr/>
<p className="footer-copyright">Copyright © 2025 Foodsy. All rights reserved.</p>

    </div>
  )
}
 

export default Footer
