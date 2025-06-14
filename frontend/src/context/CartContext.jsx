import React, { useState, useEffect, useContext } from "react";
import axios from "axios"
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';
import { TableContext } from "./TableContext";

export const CartContext = React.createContext()

const CartProvider = (props) => {
    const [CartItem, setCartItem] = useState([])
    const [isPlacingOrder, setIsPlacingOrder] = useState(false)
    const {tableId, resId} = useContext(TableContext)

    useEffect( ()=>{
        const savedCart = localStorage.getItem("cart")
        if(savedCart){
            setCartItem(JSON.parse(savedCart))
        }
    },[])

    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(CartItem))
    },[CartItem])


    const AddToCart = (id,{name, price, quantity=1, note="", addOns={}, image}) => {
        const ItemKey = uuidv4()
        const NewItem = {ItemKey,id,name, price, quantity, note, addOns,image}
        setCartItem(
            (prev) => ([...prev, NewItem])
        )
        toast.success("Item added!",{className:"toast",position: "bottom-left"})
    }


    const AddToCartInCart = (itemKeyToRemove) => {
        setCartItem(prev =>
            prev.map(item =>{
                if(item.ItemKey === itemKeyToRemove){
                    const basePrice = item.price / item.quantity
                    return({...item, quantity:item.quantity+1, price:basePrice + item.price})
                }
                return item
            }
            )
        )  
        };

    const RemoveFromCartInCart = (itemKeyToRemove) => {
        setCartItem(prev =>
            prev.flatMap(item => {
                if (item.ItemKey === itemKeyToRemove) {
                    if (item.quantity > 1) {
                        const basePrice = item.price / item.quantity
                        return [{ ...item, quantity: item.quantity - 1, price:item.price-basePrice}];
                    } else {
                        return [];
                        }
                    }
                return [item];
                })
            );
        };

    const getTotalPrice = (cartItems) => {
        return cartItems.reduce((sum, item) => sum + item.price, 0);
    };


    const PlaceOrder = async () => {
        setIsPlacingOrder(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/place`, {resID:resId, tableID:tableId, items:CartItem})
            if(response.data.success){
                setCartItem([])
                localStorage.removeItem("cart")
                toast.success("Order placed!",{className:"toast",position: "bottom-left"})
            }else{
                toast.error("Order failed",{className:"toast",position: "bottom-left"})
            }
            
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Server error while placing order",{className:"toast",position: "bottom-left"});
        } finally{
            setIsPlacingOrder(false)
        }
    }
    



    const CartValues = {
        CartItem, setCartItem,
        isPlacingOrder, setIsPlacingOrder,
        AddToCart,
        AddToCartInCart,
        RemoveFromCartInCart,
        getTotalPrice,
        PlaceOrder
    }


    return (
        <CartContext.Provider value={CartValues}>
            {props.children}
        </CartContext.Provider>
    )
    
}

export default CartProvider