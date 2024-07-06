import React, { useState } from "react";
import Burger from "../../UI/Burger/Burger";
import OneInput from "../../UI/OneInput/OneInput";


import { Link } from "react-router-dom";


const FirstTop = ({ setFilterBy, setMenuActive , userInfo ,  ...props }) => {

  

  const [inputValue, setInputValue] = useState("");
  return (
    <div  {...props} className="FirstTop">
      <Burger
        onClick={() => {
          setMenuActive(true);
        }}
      />
      <OneInput
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setFilterBy(e.target.value);
        }}
        placeholder="Поиск по заданиям..."
      />
      <Link to = '/Profile'>
        <img className="icon" src={userInfo.photo} alt="" />
      </Link>
    </div>
  );
};

export default FirstTop;
