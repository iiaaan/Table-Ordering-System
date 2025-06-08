import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    resID: String,
    name: String,
    image: String,
    price: Number,
    description: String,
    category: String,
    addOns: [{ name: String, price: Number }],
})

const foodModel =  mongoose.model("foods")