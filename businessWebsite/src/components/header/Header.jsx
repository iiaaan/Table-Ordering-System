import React from 'react'
import "./Header.css"

const Header = () => {
  return (
    <div className='header' id='header'>
      <div className="NavBar">
        <img src="/vite.svg" alt="" className='logo'/>
      <ul className='NavBar-Menu'>
        <li> <a href="#header">Home</a></li>
        <li><a href="#details">Details</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#footer">About us</a></li>
      </ul>
      </div>
      <h1>
        SIMPLIFY YOUR<br />
        RESTERAUNT<br /> 
        MANAGEMENT
      </h1>
      <h2>
        Subscribe for digital menus to view <br />
        and place orders in your resteraunt
      </h2>

      <p>For $199.99  per month. Cancel ANYTIME</p>

    </div>
  )
}

export default Header
