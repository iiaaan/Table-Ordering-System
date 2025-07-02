import mongoose from "mongoose"

const menuSchema = new mongoose.Schema({
    resID : String,
    name : String,
    image : String,
    description : String,
    category : String,
    price : String,
    note : String,
    addOns: [{ name: String, price: Number }],
})

const menuModel = mongoose.models.menu || mongoose.model("menu" , menuSchema)

export default menuModel