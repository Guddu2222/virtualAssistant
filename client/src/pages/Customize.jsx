import React from "react";
import Card from "../components/Card";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import { RiImageAddFill } from "react-icons/ri";

function Customize() {
  return (
    <div className="w-full h-screen bg-linear-to-t from-[black] to-[#030358] flex justify-center items-center flex-col  ">
      <h1 className="text-white mb-2.5 text-[30px] text-center p-5 ">Select your <span className="text-blue-400 ">Assistant Image</span> </h1>
      <div className="w-[90%] max-w-225 flex justify-center items-center flex-wrap gap-3 ">
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />
        <div className=" w-20 h-40 lg:w-45 lg:h-60 bg-[rgba(7,7,78,0.36)] border-2 border-[#2c92233c] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-2 hover:border-white flex items-center justify-center ">
         <RiImageAddFill className="text-white w-6.25 h-6.25 " /> 
        </div>
        <button className="min-w-37.5 h-15 mt-7.5 text-black font-semibold bg-white rounded-full text-[19px]" >Next </button>
      </div>
    </div>
  );
}

export default Customize;
