import React from 'react'
import "./Details.css"

const Details = () => {
  return (
    <div className='details' id='details'>
      <div className="product-summary">
        <h1>A revelutional way to manage your resteruant</h1>
        <p>Integrate modern techonology into your resteraut. Allowing cstomer to order with their phnoe to have a pressure-less efficient and engaging experience when ordering. </p>
      </div>
      <div className="product-details">
        <div className="product-detail">
          <h2>Faster service and turnover</h2>
          <p>Instant menu access at fingertips. Order placed directly to the kitchen to save your precious time</p>
        </div>
        <div className="product-detail">
          <h2>Reduced total cost</h2>
          <p>Fewer employees needed to run the resteraunt. A huge save on both management and labour cost </p>
        </div>
        <div className="product-detail">
          <h2>Upselling and personalization</h2>
          <p>Highlight daily specials, “add-ons” or pairing suggestions right in the ordering flow.</p>
        </div>
        <div className="product-detail">
          <h2>Real time analytics</h2>
          <p>Track peak ordering times, and table performance and  ingredient usage to reduce waste and optimize purchasing.</p>
        </div>
      </div>
    </div>
  )
}

export default Details
