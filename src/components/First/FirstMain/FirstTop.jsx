import React, { memo } from "react";
import Burger from "../../UI/Burger/Burger";
import OneInput from "../../UI/OneInput/OneInput";
import userPhoto from "../../../images/userPhoto/user.png"

import { Link } from "react-router-dom";


const FirstTop = ({ setFilterBy, filteredBy, setMenuActive , userInfo ,  ...props }) => {

  

  return (
    <div  {...props} className="FirstTop">
      <Burger
        onClick={() => {
          setMenuActive(true);
        }}
      />
      <OneInput
        value={filteredBy}
        onChange={(e) => {
          setFilterBy(e.target.value);
        }}
        placeholder="Поиск по заданиям..."
      />
      <Link to = '/Profile'>
        <img style={{objectFit : "cover"}} className="icon" src={userInfo.photo.length > 0 ? userInfo.photo : userPhoto} alt="" />
      </Link>
    </div>
  );
};

export default memo(FirstTop);
