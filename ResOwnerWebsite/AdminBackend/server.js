import express from "express"
import cors from "cors"
import userRouter from "./route/UserRoute.js"
import menuRouter from "./route/MenuRoute.js"
import orderRouter from "./route/OrderRoute.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv";
dotenv.config();


//config
const app = express()
const port = 5000

//middleware
app.use(express.json())
app.use(cors())

app.use('/uploads', express.static('uploads'));

//api end point
app.use("/api/user", userRouter)
app.use("/api/menu", menuRouter)
app.use("/api/order", orderRouter)

connectDB()



app.get("/", (req,res)=>{
    res.send("API working")
})

app.listen(port, ()=>{
    console.log(`backend running on http://localhost:${port}`)
})