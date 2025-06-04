import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://enhaoliu14:Hel4.002602@cluster0.hjpqite.mongodb.net/FoodOrder').then(()=>console.log("DB Connected"))
}

