import cors from "cors"
import express from "express"
import { connectDB } from "./config/db.js"
import 'dotenv/config.js'
import orderRouter from "./routes/orderRoute.js"
import uploadImageRouter from "./routes/uploadImageRoute.js"


// app config
const app = express()
const port = 4000


// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// api endpoints
app.use("/api/order", orderRouter)
app.use("/api", uploadImageRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

 app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
 })

 