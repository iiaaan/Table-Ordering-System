import React from 'react'
import './FoodItems.css'

const FoodItems = ({name, price, image,description}) => {
  return (
    <div className='FoodItems'>

        <div className="FoodItemsInfo">
           <h2>{name}</h2>
           <p className='price'>${price}</p>
           <p className='description'>{description}</p>
        </div>

        <div className="FoodItemsImg">
            <img src={image} alt="" />
        </div>
    
    </div>
  )
}

export default FoodItems
