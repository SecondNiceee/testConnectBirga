import React, { memo, useMemo } from "react";
import Burger from "../../UI/Burger/Burger";
import OneInput from "../../UI/OneInput/OneInput";
import userPhoto from "../../../images/userPhoto/user.png"

import { Link } from "react-router-dom";
import translation from "../../../functions/translate";


const FirstTop = ({ setFilterBy, filteredBy, setMenuActive , userInfo ,  ...props }) => {

  const place = useMemo( () => {
    return translation("Поиск по заданиям...")
  } , [] )

  return (
    <div  {...props} className="FirstTop">
      <OneInput
        value={filteredBy}
        onChange={(e) => {
          setFilterBy(e.target.value);
        }}
        placeholder={place}
      />
    </div>
  );
};

export default memo(FirstTop);
