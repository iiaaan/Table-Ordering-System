import React from 'react'
import "./Pricing.css"
const Pricing = () => {
  return (
    <div className='pricing' id='pricing'>
      <div className="plan">
        <h1>MENU ONLY</h1>
        <hr />
        <p className='price'>Only 29.99 per month</p>
        <hr />
        <h2>Features</h2>
        <ul>
          <li>Digital menu</li>
          <li>Physical QR sticker</li>
          <li>Update menu upon request</li>
        </ul>
      </div>
      <div className="plan">
        <h1>STANDARD</h1>
        <hr />
        <p className='price'>only 119.99 per month</p>
        <hr />
        <h2>Features</h2>
        <ul>
          <li>Digital menu</li>
          <li>Physical QR sticker</li>
          <li>Update menu upon request</li>
          <li>Table orderiing system</li>
        </ul>
      </div>
      <div className="plan">
        <h1>PLUS</h1>
        <hr />
        <p className='price'>Only 179.99 per month</p>
        <hr />
        <h2>Features</h2>
        <ul>
          <li>Digital menu</li>
          <li>Physical QR sticker</li>
          <li>Update menu upon request</li>
          <li>Table ordering system</li>
          <li>Data analytics</li>
        </ul>
      </div>
    </div>
  )
}

export default Pricing
