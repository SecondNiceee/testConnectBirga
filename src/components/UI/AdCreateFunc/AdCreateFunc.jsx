import React from "react";
import { Link } from "react-router-dom";
import cl from './AdCreateFunc.module.css';
import plus from "../../../images/icons/plus-circle.svg";
const AdCreateFunc = ({ link, text , ...props }) => {
  return (
    <Link {...props} to={link} className={cl.AdCreactingFunction}>
      <img src={plus} alt="" />
      <p>{text}</p>
    </Link>
  );
};

export default AdCreateFunc;
