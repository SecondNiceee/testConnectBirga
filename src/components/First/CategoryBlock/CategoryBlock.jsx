import React from "react";
import cl from "./CategoryBlock.module.css";
const CategoryBlock = ({ name, value , func, ...props }) => {
  return (
    <div onClick={func} {...props}  className={cl.wrapper}>
      <div className={cl.left}>
        <p className={cl.name}>{name}</p>
        <p className={cl.value}>{value}</p>
      </div>
      <div className={cl.right}>
        <svg
          width="12"
          height="14"
          viewBox="0 0 12 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.998697 5.46944L5.66536 1.66699L10.332 5.46944"
            stroke="white"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.3333 8.86455L5.66667 12.667L1 8.86455"
            stroke="white"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default CategoryBlock;
