import React, { memo } from "react";
import Burger from "../../UI/Burger/Burger";
import OneInput from "../../UI/OneInput/OneInput";
import userPhoto from "../../../images/userPhoto/user.png"

import { Link } from "react-router-dom";


const FirstTop = ({ setFilterBy, filteredBy, setMenuActive , userInfo ,  ...props }) => {

  

  return (
    <div  {...props} className="FirstTop">
      <OneInput
        value={filteredBy}
        onChange={(e) => {
          setFilterBy(e.target.value);
        }}
        placeholder="Поиск по заданиям..."
      />
    </div>
  );
};

export default memo(FirstTop);
