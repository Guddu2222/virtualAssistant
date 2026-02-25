import isAuth from "../middlewares/isAuth.js" 
import upload from "../middlewares/multer.js" 
import express from "express"
import { getCurrentUser, updateAssistant } from "../controllers/user.controllers.js"
const userRouter=express.Router()

userRouter.get("/getCurrentUser",isAuth,getCurrentUser)
userRouter.post("/update",isAuth,upload.single("assistantImage"),updateAssistant)



export default userRouter