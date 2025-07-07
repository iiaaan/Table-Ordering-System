import mongoose from "mongoose"
import menuModel from "../models/MenuModel.js"

const fetchFoodList = async (req, res) => {
    try {
        const food_list = await menuModel.find()
        res.send(food_list)
    } catch (error) {
        console.log(error)
    }
}

export {fetchFoodList}