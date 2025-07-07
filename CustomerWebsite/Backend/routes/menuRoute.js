import express from "express"
import { fetchFoodList } from "../controllers/menuController.js"

const menuRouter = express.Router()

menuRouter.get("/food", fetchFoodList)

export default menuRouter