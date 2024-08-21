import React from "react";
import cl from "./LoaderBlock.module.css";
import MyLoader from "../../UI/MyLoader/MyLoader";
const LoaderBlock = () => {
  return (
    <>
      <div className={cl.wrapper}></div>
      <MyLoader style={{ width: "100vw", height: "100vh", zIndex : "2000" }} />
    </>
  );
};

export default LoaderBlock;
