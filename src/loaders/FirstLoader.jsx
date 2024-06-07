import React, { useEffect, useState } from "react";
import { ProgressBar, ThreeDots, ThreeCircles, Triangle } from "react-loader-spinner";
import "./loaders.css";
const FirstLoader = () => {
  let [dotStyles, setDotStyles] = useState({
    display: "none",
  });
  let [dotStylesTwo, setDotStylesTwo] = useState({
    display: "none",
  });
  let [dotStylesThree, setDotStylesThree] = useState({
    display: "none",
  });
  return (
    <div className="firstLoader">
        <Triangle
          visible={true}
          height="80"
          width="80"
          color="white"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      <div className="loaderText-block">
        <p className="loaderText">Загрузка заданий</p>
        {/* <ThreeDots
          visible={true}
          height="20"
          width="20"
          color="white"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass="threeDots"
        /> */}
      </div>
    </div>
  );
};

export default FirstLoader;
