import cors from "cors"
import express from "express"
import path from "path"
import { connectDB } from "./config/db.js"
import 'dotenv/config.js'
import orderRouter from "./routes/orderRoute.js"
import uploadImageRouter from "./routes/uploadImageRoute.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


// app config
const app = express()
const port = 4000


// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

app.use("/.well-known/acme-challenge", express.static("/var/www/html"));


// api endpoints
app.use("/api/order", orderRouter)
app.use("/api", uploadImageRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"))
})


 app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
 })

 