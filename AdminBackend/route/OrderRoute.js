import express from "express"
import ListOrders from "../controllers/OrderController.js"

const orderRouter = express.Router()

orderRouter.get("/list",ListOrders)

export default orderRouter