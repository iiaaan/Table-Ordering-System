import { useState,useEffect } from "react"
import React from "react"
import {food_list} from "../frontend_assets/guipaopao.js"
import { v4 as uuidv4 } from 'uuid';
import axios from "axios"
import { toast } from 'react-toastify'

export const Context = React.createContext()


const ContextProvider = (props) =>{
    const [currentCategory, setCurrentCategory] = useState("")
    const [CartItem, setCartItem] = useState([])
    const [tableId, setTableId] = useState("")
    const [restaurantId, setRestaurantId] = useState("")
    const [selectedItem, setSlectedItem] = useState("")
    const [isPlacingOrder, setIsPlacingOrder] = useState(false)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        setTableId(params.get("tableId") || "")
        setRestaurantId(params.get("resterauntId") || "")
        
        const savedCart = localStorage.getItem("cart")
        if(savedCart){
            setCartItem(JSON.parse(savedCart))
        }
    }, [])

    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(CartItem))
    },[CartItem])

    const AddToCart = (id,{name, price, quantity=1, note="", addOns={}, image}) => {
        const ItemKey = uuidv4()
        const NewItem = {ItemKey,id,name, price, quantity, note, addOns,image}
        setCartItem(
            (prev) => ([...prev, NewItem])
        )
        setSlectedItem(null)
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
            const response = await axios.post("http://localhost:4000/api/order/place", {resterauntID:restaurantId, tableID:tableId, items:CartItem})
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

    const ContextValues = {
        currentCategory,
        food_list,
        CartItem,
        selectedItem,
        tableId,
        restaurantId,
        isPlacingOrder,
        setCurrentCategory,
        setCartItem,
        setSlectedItem,
        AddToCart,
        AddToCartInCart,
        RemoveFromCartInCart,
        PlaceOrder,
        setIsPlacingOrder,
        getTotalPrice
    }

    return (
        <Context.Provider value={ContextValues}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider