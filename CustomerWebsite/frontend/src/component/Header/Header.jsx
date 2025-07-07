import React from 'react'
import "./Header.css"

const Header = () => {
  return (
    <div className='header' id='header'>
      <div className="backgroundImage">
        <img src="/backgroundIMG.jpg" alt="" />
      </div>
      <div className="title">
        <h1>Delicous Resteraumt</h1>
      </div>
    </div>
  )
}

export default Header