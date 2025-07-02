import express from "express"
import { loginUser, resisterUser } from "../controllers/UserController.js"

const userRouter = express.Router()

userRouter.post("/register", resisterUser)
userRouter.post("/login", loginUser)

export default userRouter