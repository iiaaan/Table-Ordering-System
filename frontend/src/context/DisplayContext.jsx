import React, {useState} from "react";
import {food_list} from "../frontend_assets/guipaopao.js"

export const DisplayContext = React.createContext()

const DisplayProvider = (props) => {
    const [currentCategory, setCurrentCategory] = useState("")
    const [selectedItem, setSlectedItem] = useState("")


    const DisplayValues = {
        currentCategory, setCurrentCategory,
        selectedItem, setSlectedItem,
        food_list
    }

    return (
        <DisplayContext.Provider value={DisplayValues}>
            {props.children}
        </DisplayContext.Provider>
    )
}

export default DisplayProvider