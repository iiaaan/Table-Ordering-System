import orderModel from "../models/orderModel.js"

const placeOrder = async (req, res) => {

    const frontend_url = "http://localh:5174"

    try {
        const newOrder = new orderModel({
            resID: req.body.resID,
            tableID: req.body.tableID,
            items: req.body.items,
        })
        await newOrder.save()

        res.json({success:true, message: "Order placed successfully"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {placeOrder}