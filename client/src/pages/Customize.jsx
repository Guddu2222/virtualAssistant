import React, { useContext, useRef, useState } from "react";
import Card from "../components/Card";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import { RiImageAddFill } from "react-icons/ri";
import userContext, { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

function Customize() {
  const {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);
  const inputImage = useRef();
  const navigate=useNavigate()
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));

  };

  return (
    <div className="w-full h-screen bg-linear-to-t from-[black] to-[#030358] flex justify-center items-center flex-col  ">
      <IoMdArrowRoundBack className="text-white w-6.25 h-6.25 absolute top-5 left-5 cursor-pointer " onClick={()=>navigate("/")} />
            <h1 className="text-white mb-2.5 text-[30px] text-center p-5 "></h1>
      <h1 className="text-white mb-2.5 text-[30px] text-center p-5 ">
        Select your <span className="text-blue-400 ">Assistant Image</span>{" "}
      </h1>
      <div className="w-[90%] max-w-225 flex justify-center items-center flex-wrap gap-3 ">
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />
        <div
          className={` w-20 h-40 lg:w-45 lg:h-60 bg-[rgba(7,7,78,0.36)] border-2 border-[#2c92233c] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-2 hover:border-white flex items-center justify-center  ${selectedImage=="input"?"border-2 border-white shadow-2xl shadow-blue-950 ":null}`}
          onClick={() => {
            inputImage.current.click();
            setSelectedImage("input");
          }}
        >
          {!frontendImage && (
            <RiImageAddFill className="text-white w-6.25 h-6.25 " />
          )}
          {frontendImage && (
            <img src={frontendImage} className="h-full object-cover" />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>
      {selectedImage &&  <button className="min-w-37.5 h-15 mt-7.5 text-black font-semibold cursor-pointer bg-white rounded-full text-[19px]"  onClick={()=>navigate("/customize2")}  >
        Next{" "}
      </button> }  
     
    </div>
  );
}

export default Customize;
