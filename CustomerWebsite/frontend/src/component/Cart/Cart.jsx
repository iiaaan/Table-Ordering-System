import React, { useContext,useEffect } from 'react'
import './Cart.css'
import { CartContext } from '../../context/CartContext'

const Cart = () => {

  const {CartItem,AddToCartInCart,RemoveFromCartInCart,PlaceOrder,isPlacingOrder,getTotalPrice} = useContext(CartContext)

  useEffect(()=>{
    console.log("cartItemchanged", CartItem)
  }, [CartItem])

  if(CartItem.length === 0||!CartItem){
    return(
      <div className="noCartItem">
        <h1>You have not select any item yet </h1>
      </div>
    )
  }
  

  return (
    <div>
      {CartItem.map((item, index)=>{
        return(
          <div className="cartitem" key={index}>
            <div className="cartitem-top">
              <img src={item.image} alt="" />
              <div className="cartitem-info">
                <p>{item.name}</p>
                <p>Price: ${item.price}</p>
                <div className="quantity">
                  <p onClick={()=>{AddToCartInCart(item.ItemKey)}}>+</p>
                  <p>{item.quantity}</p>
                  <p onClick={()=>{RemoveFromCartInCart(item.ItemKey)}}>-</p>
                </div>
              </div>
            </div>

            <div className="cartitem-addons">
              {Object.keys(item.addOns).length === 0
                ? 'No add-ons'
                : Object.entries(item.addOns)
                    .map(([name, quant]) => `${name} x${quant}`)
                    .join(', ')
              }
            </div>

            <div className="cartitem-note">
              {item.note}
            </div>
          </div>

        )
      })}


      <div className="placeOrder">
        <button
        onClick={()=>PlaceOrder(CartItem)}
        disabled={isPlacingOrder}>
          {isPlacingOrder ? "..." : `Place Order $${getTotalPrice(CartItem).toFixed(2)}`}
        </button>
      </div>
    </div>
    
  )
}

export default Cart
