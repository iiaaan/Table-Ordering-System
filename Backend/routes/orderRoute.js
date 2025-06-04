import express from "express"
import { placeOrder} from "../controllers/orderController.js"

const orderRouter = express.Router()

orderRouter.post("/place",placeOrder)

export default orderRouter