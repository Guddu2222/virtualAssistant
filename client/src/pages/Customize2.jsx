import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
function Customize2() {
  const navigate = useNavigate();
  const {userData,backendImage,selectedImage,serverUrl,setUserData }=useContext(userDataContext)
  const [assistantname,setAssistantName]=useState(userData?.assistantName || "")
  const [loading,setLoading]=useState(false)
  const handleUpdateAssistant=async ()=>{
    try {
      setLoading(true)
      let formData=new FormData()
      formData.append("assistantName",assistantname)
      if(backendImage){
        formData.append("assistantImage",backendImage)

      }
      else {
        formData.append("imageUrl",selectedImage)
      }
      const result =await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})

      console.log(result.data)
      setUserData(result.data)
      navigate("/")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="w-full h-screen bg-linear-to-t from-[black] to-[#030358] flex justify-center items-center flex-col">
      <IoMdArrowRoundBack className="text-white w-6.25 h-6.25 absolute top-5 left-5 cursor-pointer " onClick={()=>navigate("/customize")} />
      <h1 className="text-white mb-2.5 text-[30px] text-center p-5 ">
        Enter Your <span className="text-blue-400 ">Assistant Name </span>{" "}
      </h1>
      <input
        type="email"
        placeholder="Assistant name"
        className="w-full max-w-150 bg-transparent border border-white/40 rounded-full px-5 py-3 text-white placeholder-white/70 focus:outline-none focus:border-blue-400"
        required
        onChange={(e)=>setAssistantName(e.target.value)} value={assistantname}
      />
      {assistantname && <button className="min-w-75 h-15 mt-7.5 text-black font-semibold cursor-pointer bg-white rounded-full text-[19px]" disabled={loading} onClick={()=>{
       handleUpdateAssistant() 
      }}   >
       {!loading?"Finally Create your assistant":"loading..."}
      </button>  }
      
    </div>
  );
}

export default Customize2;
