import React from "react";

function Card({ image }) {
  return (
    <div className=" w-20 h-40 lg:w-45 lg:h-60 bg-[rgba(7,7,78,0.36)] border-2 border-[#2c92233c] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-2 hover:border-white ">
      <img src={image} className="h-full object-cover w-full" />
    </div>
  );
}

export default Card;
