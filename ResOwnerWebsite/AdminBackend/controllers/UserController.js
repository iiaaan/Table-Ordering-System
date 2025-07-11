import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import { use } from "react";

const createToken = (id, name) => {
    const token = jwt.sign({id, name},process.env.JWT_SECRET)
    console.log("Creating token with:", { id, name });
    console.log("raw token ", token)
    return token
}
// login user
const loginUser = async(req,res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false,message: "Invalid password or emails"})
        }

        const token = createToken(user._id, user.name)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}



const resisterUser = async(req,res) => {
    const {name,password,email} = req.body;
    try{
        const exist = await userModel.findOne({email})
        if(exist){
            return res.json({success:false,message:"User already exist"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valide email"})
        }

        if(password.length<8){
            return res.json({success:false, message:"Please enter a password with a lenghth greater than 8"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUSer = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })

        const user = await newUSer.save()
        const token = createToken(user._id, user.name)
        res.json ({success:true,token})

    }catch(error){
        console.log(error)
        res.json({success:false,message:"error"})
    }

}

export{ loginUser, resisterUser }