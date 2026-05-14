// import React from 'react'
// import './Navbar.css'
// import { assets } from '../../assets/frontend_assets/assets'
// import { Link } from 'react-router-dom'
// import { StoreContext } from '../../Context/StoreContext'
// function Navbar({setShowLogin}) {
// // jis page p rahe wo underline ho jaaea 
//     const [menu, setMenu] = React.useState("Home")

//     const {getTotalCartAmount} = React.useContext(StoreContext);
//   return (
//     <div className='navbar'>
//      <Link to="/"> <h1 className='span-1'>Foodsy</h1></Link>
//       <ul className="navbar-menu">
//        <li>
//       <Link
//         to="/"
//         onClick={() => setMenu("Home")}
//         className={menu === "Home" ? "active" : ""}
//       >
//         Home
//       </Link>
//     </li>
//     <li>
//       <a
//         href="#explore-menu"
//         onClick={() => setMenu("Menu")}
//         className={menu === "Menu" ? "active" : ""}
//       >
//         Menu
//       </a>
//     </li>
//     <li>
//       <a
//         href="#app-download"
//         onClick={() => setMenu("Mobile-app")}
//         className={menu === "Mobile-app" ? "active" : ""}
//       >
//         Mobile-app
//       </a>
//     </li>
//     <li>
//       <a
//         href="#footer"
//         onClick={() => setMenu("Contact-Us")}
//         className={menu === "Contact-Us" ? "active" : ""}
//       >
//         Contact Us
//       </a>
//     </li>
//   </ul>
//      <div className="navbar-right">
//   <img src={assets.search_icon} alt="search" />
//   <div className="navbar-search-icon">
//    <Link to='/Cart'> <img src={assets.basket_icon} alt="basket" /></Link>
//     <div className={getTotalCartAmount()===0?"" : "dot"}></div>
//   </div>
//   <button onClick={()=>setShowLogin(true)}>Sign in</button>
// </div>
// </div>
//   )
// }

// export default Navbar
import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/frontend_assets/assets';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { motion } from 'framer-motion';

const STAGGER = 0.035;

// Hover-only TextRoll component
const TextRoll = ({ children, className, center = false }) => {
  const letters = String(children).split('');

  return (
    <motion.span
      initial="initial"
      whileHover="hovered" // animation triggers only on hover
      className={className}
      style={{
        display: 'inline-block',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {/* Top row: visible initially */}
      <div style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        {letters.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i;
          return (
            <motion.span
              key={`t1-${i}`}
              variants={{
                initial: { y: 0 },
                hovered: { y: '-100%' }, // scroll up on hover
              }}
              transition={{ ease: 'easeInOut', delay }}
              style={{ display: 'inline-block' }}
            >
              {l}
            </motion.span>
          );
        })}
      </div>

      {/* Bottom row: hidden initially */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          display: 'inline-block',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        {letters.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i;
          return (
            <motion.span
              key={`t2-${i}`}
              variants={{
                initial: { y: '100%' },
                hovered: { y: 0 }, // scroll in on hover
              }}
              transition={{ ease: 'easeInOut', delay }}
              style={{ display: 'inline-block' }}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = React.useState("Home");
  const { getTotalCartAmount,token ,setToken } = React.useContext(StoreContext);


  // use navigate hook is use to navigate on pages
  const navigate = useNavigate();
  

  const logout = () =>{
    // logout k liyea token remove krna hoga 
    localStorage.removeItem("token")
    // token khalli kro 
    setToken("")
    // isse navigate hota hai page 
    navigate("/")
  }

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Menu", href: "#explore-menu" },
    { name: "Mobile-app", href: "#app-download" },
    { name: "Contact-Us", href: "#footer" },
    
  ];
  return (
    <div className='navbar'>
      <Link to="/"> 
        <h1 className='span-1'>Foodsy</h1>
      </Link>

      <ul className="navbar-menu">
        {navItems.map((item, idx) => (
          <li key={idx}>
            {item.to ? (
              <Link
                to={item.to}
                onClick={() => setMenu(item.name)}
                className={menu === item.name ? "active" : ""}
              >
                <TextRoll center>{item.name}</TextRoll>
              </Link>
            ) : (
              <a
                href={item.href}
                onClick={() => setMenu(item.name)}
                className={menu === item.name ? "active" : ""}
              >
                <TextRoll center>{item.name}</TextRoll>
              </a>
            )}
          </li>
        ))}
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        <div className="navbar-search-icon">
          <Link to='/Cart'>
            <img src={assets.basket_icon} alt="basket" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)}>Sign in</button> 
        : <div className='navbar-profile'>
          <img src={assets.profile_icon} alt=''/>
<ul className='nav-profile-dropdown'>
  <Link to='/myorders'>
    <li><img src={assets.bag_icon}/><p>Orders</p></li>
  </Link>
  <hr/>
  <li onClick={()=>logout()}><img src={assets.logout_icon} alt=''/><p>Logout</p></li>
</ul>
          </div>}
        
      </div>
    </div>
  );
}

export default Navbar;
