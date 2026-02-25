import User from "../models/user.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";

export const getCurrentUser = async(req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");  
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({message:"get current user error"});
  }
} 

export const updateAssistant = async(req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    let assistantImage;

    if(req.file){
      const uploadResultUrl = await uploadOnCloudinary(req.file.path);
      if(!uploadResultUrl) {
         return res.status(500).json({message: "Error uploading image to cloudinary"});
      }
      assistantImage = uploadResultUrl; 
    } else {
      assistantImage = imageUrl;
    }
   
    const user = await User.findByIdAndUpdate(
      req.userId, 
      { assistantName, assistantImage }, 
      { new: true }
    ).select("-password");
    
    return res.status(200).json(user);

  } catch (error) {
     console.error("Detailed error in updateAssistant: ", error); 
     return res.status(500).json({ message:"update assistant error", error: error.message });
  }
}