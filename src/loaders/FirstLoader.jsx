import React, { useEffect, useState } from "react";
import { ProgressBar, ThreeDots, ThreeCircles } from "react-loader-spinner";
import "./FirstLoader.css";
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
  useEffect(() => {
    setInterval(() => {
      console.log("воу");
      let display = "block";
      if (dotStyles.display === "none") {
        display = "block";
      } else {
        display = "none";
      }
      setDotStyles({
        display: display,
      });
      setDotStyles({
        display: display,
      });
    }, 1500);
  }, []);
  return (
    <div className="firstLoader">
    <ThreeCircles
        visible={true}
        height="80"
        width="80"
        color="white"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
    />
      <div className="loaderText-block">
        <p className="loaderText">Загрузка заданий</p>
        <ThreeDots
          visible={true}
          height="20"
          width="20"
          color="white"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass="threeDots"
        />
      </div>
    </div>
  );
};

export default FirstLoader;
