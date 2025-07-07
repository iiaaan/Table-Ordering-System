import axios from "axios";
import React, {useState, useEffect} from "react";

export const DisplayContext = React.createContext()

const DisplayProvider = (props) => {
    const [currentCategory, setCurrentCategory] = useState("")
    const [selectedItem, setSlectedItem] = useState("")
    const [food_list, setFoodList] = useState([]); // store food list here

    useEffect(() => {
    // Fetch data on mount
        const fetchFoodList = async () => {
            try {
            const response = await axios.get(`${import.meta.env.ADMIN_BACKEND_URL}/api/menu/food`);
            setFoodList(response.data); // or response.data.food_list depending on backend
        } catch (error) {
            console.error("Failed to fetch food list:", error);
        }
        };
        fetchFoodList();
    }, []);


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