import isAuth from "../middlewares/isAuth.js"  
import express from "express"
import { getCurrentUser } from "../controllers/user.controllers.js"
const userRouter=express.Router()

userRouter.get("/getCurrentUser",isAuth,getCurrentUser)



export default userRouter