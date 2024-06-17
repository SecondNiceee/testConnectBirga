import React from "react";
import { Link } from "react-router-dom";
import cl from './AdCreateFunc.module.css';
import plus from "../../../images/icons/plus-circle.svg";
const AdCreateFunc = ({ link, text , func ,  ...props }) => {
  return (
    <>
    {link ? 
      <Link {...props} to={link} className={cl.AdCreactingFunction}>
        <img src={plus} alt="" />
        <p>{text}</p>
      </Link>
      :
      <div {...props} onClick={func} className={cl.AdCreactingFunction}>
        <img src={plus} alt="" />
        <p>{text}</p>
      </div>
    }
    </>
  );
};

export default AdCreateFunc;
