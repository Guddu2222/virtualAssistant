import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
function Home() {
  const {userData,serverUrl,setUserData, getGeminiResponse}=useContext(userDataContext)
  const navigate=useNavigate()
  const handleLogout=async()=>{
    try {
      await axios.post(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      setUserData(null)
      navigate("/signin")
    } catch (error) {
      setUserData(null)
      console.log(error)
    }
  }
  const speak=(text)=>{
    const utterance=new SpeechSynthesisUtterance(text) // convert text to speech
    window.speechSynthesis.speak(utterance)
  }
  useEffect(()=>{
    const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition=new SpeechRecognition();
    recognition.continuous=true;
    recognition.lang="en-US";

    recognition.start();
    recognition.onresult= async (e)=>{
      const transcript=e.results[e.results.length-1][0].transcript.trim();
      console.log(transcript);
     if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
      const data= await getGeminiResponse(transcript)
      console.log(data)
      speak(data.response)
     }
    }
  
  },[])
  return (
    <div className="w-full h-screen bg-linear-to-t from-[black] to-[#030358] flex justify-center items-center flex-col ">
      <button
            type="submit"
            className="min-w-37.5 h-15 mt-7.5 text-black font-semibold cursor-pointer bg-white rounded-full text-[19px]
            absolute top-[20px] right-[20px]
            " onClick={handleLogout}
          >
            Log Out
          </button>
          <button
            type="submit"
            className="min-w-37.5 h-15 mt-7.5 text-black font-semibold cursor-pointer bg-white rounded-full text-[19px]
            absolute top-[100px] right-[20px] px-[20px]
            "
             onClick={()=>navigate("/customize")} 
          >
            
            Customize your Assistant
          </button>
      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
        <img src={userData?.assistantImage} alt="" className='h-full object-cover ' />
      </div>
      <h1 className='text-white text-[30px] mt-5 font-semibold ' >I'm {userData?.assistantName}</h1>
    </div>
  )
}

export default Home