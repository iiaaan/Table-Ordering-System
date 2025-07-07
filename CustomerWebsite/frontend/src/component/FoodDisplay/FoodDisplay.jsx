import React, { useContext } from 'react'
import FoodItems from '../FoodItems/FoodItems.jsx'
import './FoodDisplay.css'
import FoodItemDetails from '../FoodItemDetails/FoodItemDetails.jsx'
import { DisplayContext } from '../../context/DisplayContext.jsx'

const FoodDisplay = () => {

    const {currentCategory,food_list,selectedItem, setSlectedItem} = useContext(DisplayContext)

  return (

    <div className='allFoodItems'>
      <div className="fooditem">
            {food_list.map((item,index)=>{
            if(currentCategory===""||currentCategory===item.category){
                return (
                  <div  key={item._id}  onClick={() => setSlectedItem(item._id)}>
                    <FoodItems name={item.name} price={item.price} image={item.image} description={item.description} />
                  </div>
                )
            }
        })}  
      </div>    
        {selectedItem &&(
          <div className="modal-overlay"
          onClick={() => setSlectedItem(null)}>
            <div className="modal-content"
            onClick={(e) => e.stopPropagation()}>
              <FoodItemDetails id={selectedItem} setSelectedItem={setSlectedItem}/>
            </div>
          </div>
        )}   
    </div>
  )
}

export default FoodDisplay
