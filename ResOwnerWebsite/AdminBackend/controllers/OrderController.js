import mongoose from "mongoose";

const ListOrders = async (req, res) => {
    try {
        const resID = req.query.resID;
        
        if (!resID) {
            return res.json({success: false, message: "Restaurant ID is required"});
        }
        
        const orders = await mongoose.connection.db.collection('orders')
            .find({resID: resID})
            .toArray();
            
        res.json({ 
            success: true, 
            data: orders, 
            message: "Orders have been listed successfully!"
        });
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Failed to list orders"});
    }
}

export default ListOrders