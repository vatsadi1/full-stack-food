import React from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'
import AppDownload from '../../Components/AppDownload/AppDownload'
import { Link } from 'react-router-dom';


function Home() {
    const [category, setCategory] = React.useState('All')
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      {/* Other navigation links */}
      {/* <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link> */}
      <AppDownload/>
      
    </div>
  )
}

export default Home
