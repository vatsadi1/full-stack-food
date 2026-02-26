import React from 'react'
import './Header.css'
function Header() {
  return (
    <div className='header'>
      {/* <video width="100%" height="240" autoPlay muted>
  <source src="src\assets\frontend_assets\62cb974b3cd7fcf0861fd065664dca70.mp4" type="video/mp4"/>
   
  Your browser does not support the video tag.
</video> */}

        <div className="header-contents">
            <h2>Order Your FAvourite Food Here</h2>
            <p>Welcome to Foodsy, your one-stop destination for delicious food delivery in Ludhiana! We're passionate about bringing a wide variety of cuisines and flavors directly to your doorstep. Whether you're craving a classic burger, a flavorful biryani, or a refreshing dessert, we've got something to satisfy every appetite. </p>
            <button>View Menu</button>
        </div>
      
    </div>
  )
}

export default Header
