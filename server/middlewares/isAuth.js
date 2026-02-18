import jwt from "jsonwebtoken"
const isAuth=(req,res,next)=>{
  try {
    const token=req.cookies.token
    if(!token){
      return res.status(400).json({message:"Token not found"})
    }
    const verifyToken=  jwt.verify(token,process.env.JWT_SECRET)
    req.userId=verifyToken.userId
    next()
    
  } catch (error) {
    return res.status(400).json({message:"Token not found"})
  }  
} 
export default isAuth
