import React, { useContext, useState, useEffect } from 'react'
import Select from "react-select"
import './FoodItemDetails.css'
import { DisplayContext } from '../../context/DisplayContext'
import { CartContext } from '../../context/CartContext'


const FoodItemDetails = ({id, setSelectedItem}) => {
  const { AddToCart, CartItem} = useContext(CartContext)
  const {food_list, selectedItem, setSlectedItem,} = useContext(DisplayContext)
  const Item = food_list.find( item => item._id === id )
  const [selectedNum, setSelectedNum] = useState({ value: 0, label: '0' })
  const [addOns,setAddOns] = useState({})
  const [note,setNote] = useState()
  const [addonCost, setAddonCost] = useState(0)

    useEffect(()=>{
    console.log("cartItemchanged", CartItem)
  }, [CartItem])

  const options = Array.from({length:10}, 
  (_,i)=>({
    value: i + 1,
    label: `${i + 1}`,
  }))

  const OnchangeHandler = (selectedNum) => {
    setSelectedNum(selectedNum)
  }

  if(!Item) {
    return <p>Item not found</p>
  }

  return (
    <div className='ItemDetails'>

      <button className="close-btn" onClick={() => setSelectedItem(null)}>×</button>

      <div className="basciInfo">
        <div className="image">
          <img src={Item.image} alt="" className="food-image"/>
        </div>

        <div className="details">
          <p>{Item.name}</p>
          <p>${Item.price}</p>
          <p>{Item.description}</p>
        </div>
      </div>

      <div className="customize">
        <div className="AddOns">
        <p>Add ons:</p>
        {
          Item.addOns && Array.isArray(Item.addOns) && Item.addOns.map((addOn, index)=>{
            const count = addOns[addOn.name] || 0
            return (<div className="addon" key={index}>
              <p>{addOn.name}:${addOn.price}</p>
              <p 
              onClick={
                ()=>{setAddOns(prev=>({...prev, [addOn.name]: (prev[addOn.name] || 0) + 1})),
                     setAddonCost(prev => prev+addOn.price)}
              }
              >+</p>

              {count>0?<p 
              onClick={
                ()=>{setAddOns(prev=>({...prev, [addOn.name]: (prev[addOn.name] || 0) - 1})), 
                     setAddonCost(prev => prev-addOn.price)}}
              >-</p>:<></>}
              <p>{count}</p>
            </div>)
            })
        }
      </div>

      <div className="Note">
        <p>Special instructions</p>
        <textarea placeholder='Add a note' value={note} onChange={e => setNote(e.target.value)}></textarea>
      </div>
      </div>

      <div className="placeOrder">
        <Select
        options={options}
        onChange={OnchangeHandler} 
        value={selectedNum}
        />
        <button
        disabled={selectedNum.value===0} 
        onClick={()=>{
          AddToCart(id, {name:Item.name, price:(selectedNum.value * (Number(Item.price)+addonCost)), quantity:selectedNum.value, note:note, addOns:addOns, image:Item.image},
          setSlectedItem(null))
        }}>
          Add {selectedNum.value} to cart
          {selectedNum.value !== 0
          ? `, total of $${(selectedNum.value * (Number(Item.price)+addonCost)).toFixed(2)}`
          : ''}
        </button>
      </div>

    </div>
  )
}

export default FoodItemDetails
