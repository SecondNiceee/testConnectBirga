import React, { memo } from "react";
import { Link } from "react-router-dom";
import cl from "./AdCreateFunc.module.css";
import plus from "../../../images/icons/plus-circle.svg";
const AdCreateFunc = ({ link, text, func, className, ...props }) => {
  return (
    <>
      {link ? (
        <Link
          {...props}
          to={link}
          className={
            className
              ? [cl.AdCreactingFunction, className].join(" ")
              : cl.AdCreactingFunction
          }
        >
          <img src={plus} alt="" />
          <p>{text}</p>
        </Link>
      ) : (
        <div {...props} onClick={func} 
        className={
          className
            ? [cl.AdCreactingFunction, className].join(" ")
            : cl.AdCreactingFunction
        }>
          <img src={plus} alt="" />
          <p>{text}</p>
        </div>
      )}
    </>
  );
};

export default memo(AdCreateFunc);
