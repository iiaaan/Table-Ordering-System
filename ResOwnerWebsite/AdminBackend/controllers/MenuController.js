import menuModel from "../models/MenuModel.js";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs';
import path from "path"
import dotenv from "dotenv"
dotenv.config()

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

console.log("bucketRegion:", bucketRegion); // Check for undefined


const s3 = new S3Client({
    credentials: {
        accessKeyId:accessKey,
        secretAccessKey:secretAccessKey
    },
    region: bucketRegion
})

const AddToMenu = async (req,res) => {

    const filePath = path.join('uploads', req.file.filename);
    const fileBuffer = fs.readFileSync(filePath);

    const params = {
        Bucket: bucketName,
        Key: req.file.filename,
        Body: fileBuffer,
        ContentType: req.body.mimeType
    }

    const parsedAddOns = JSON.parse(req.body.addOns).map(addOn => ({
    name: addOn.key,
    price: Number(addOn.value)
    }));


    const command = new PutObjectCommand(params)
    await s3.send(command)
    const imageUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${req.file.filename}`;

    try {
        const MenuItem = new menuModel({
            resID : req.body.resID,
            name : req.body.name,
            image : imageUrl,
            description : req.body.description,
            category : req.body.category,
            price : req.body.price,
            note : req.body.note,
            addOns: parsedAddOns,
        })

        await MenuItem.save()

        res.json({success:true, message: "Item successfully added to menu"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const ListMenuItems = async (req,res) => {
    try {
        const {resID} = req.query
        const meunItems = await menuModel.find({resID})
        res.json({success: true, data: meunItems, message: "menu item listed"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "failed to list menu items"})
    }
}

const DeleteMenuItem = async (req,res) => {

    try {
        const {id} = req.body
        const item = await menuModel.findById(id);
        const imageUrl = item.image;
        const key = imageUrl.split("/").pop();
        const params = {
            Bucket: bucketName,
            Key: key
        }
        const command = new DeleteObjectCommand(params)
        await s3.send(command)

        await menuModel.findByIdAndDelete(id)
        res.json({success:true, message: "Successfully deleted item!"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "failed to delete item"})
    }
}

export{AddToMenu, ListMenuItems, DeleteMenuItem}