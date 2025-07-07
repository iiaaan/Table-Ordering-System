import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    resID:{type:String, required:true},
    tableID:{type:String, required:true},
    items:{type:Array, required:true},
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema)

export default orderModel