import express from "express"
import { AddToMenu, ListMenuItems, DeleteMenuItem} from "../controllers/MenuController.js"
import { upload } from "../config/multerConfig.js"

const menuRouter = express.Router()

menuRouter.post("/add", upload.single("image"), AddToMenu)
menuRouter.get("/list", ListMenuItems)
menuRouter.delete("/delete", DeleteMenuItem)

export default menuRouter