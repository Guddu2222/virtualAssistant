import User from "../models/user.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import moment from "moment";
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

export const getAIResponse = async(req, res) => {
  try {
    const { command } = req.body;
    const user = await User.findById(req.userId);
    const userName=user.name;
    const assistantName=user.assistantName;
    const result = await geminiResponse(command, userName, assistantName);

    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if(!jsonMatch){
      return res.status(500).json({message:"Invalid response from AI"});
    }
    const gemResult = JSON.parse(jsonMatch[0]);
    const type=gemResult.type;
    const userInput=gemResult.userInput;
    const response=gemResult.response;

    switch(type){
      case "get-date":
       return res.json({
        type,
        userInput:gemResult.userInput,
        response:`current data is ${moment().format("DD-MM-YYYY")}`
       })
       case "get-time":
        return res.json({
          type,
          userInput:gemResult.userInput,
          response:`current time is ${moment().format("hh:mm:A")}`
         })
         case "get-day":
          return res.json({
            type,
            userInput:gemResult.userInput,
            response:`current day is ${moment().format("dddd")}`
           })
           case "get-month":
            return res.json({
              type,
              userInput:gemResult.userInput,
              response:`current month is ${moment().format("MMMM")}`
             })
             case "get-year":
              return res.json({
                type,
                userInput:gemResult.userInput,
                response:`current year is ${moment().format("YYYY")}`
               })
              case 'google-search':
              case 'youtube-search':
              case 'youtube-play':
              case 'calculator-open':
              case 'instagram-open':  
              case 'facebook-open':
              case 'weather-show':
              case 'general': return res.json({
                type,
                userInput:gemResult.userInput,
                response:gemResult.response 
              });
              default:
                return res.status(400).json({message:"I didn't understand your command"});
    }
    res.status(200).json({type,userInput,response});
  } catch (error) {
    return res.status(500).json({message:"Ask assistant error"});
    
  }
}