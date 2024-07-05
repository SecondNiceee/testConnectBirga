import React, { useMemo } from "react";
import cl from "./FullPicker.module.css";
const FullPicker = ({
  values,
  keys,
  nowKey,
  setNowKey,
  className,
  GreyIntWidth,
  GreyWidth,
}) => {
  console.log(nowKey, keys);
  const myTransform = useMemo(() => {
    for (let i = 0; i < keys.length; i++) {
      if (nowKey === keys[0]) {
        return "translateX(2px)";
      }
      if (nowKey === keys[i]) {
        return "translateX(" + (GreyIntWidth * i + 2).toString() + "px)";
      }
    }
  }, [nowKey, GreyIntWidth, keys]);
  return (
    <div className={className ? [cl.track, className].join(" ") : cl.track}>
      <div
        style={{ width: GreyWidth, transform: myTransform }}
        className={cl.greyBlock}
      ></div>
      {nowKey === keys[0] ? (
        <p
          className={cl.bigValue}
          onClick={(e) => {
            setNowKey(keys[0]);
          }}
        >
          {values[0]}
        </p>
      ) : (
        <p
          className={cl.value}
          onClick={(e) => {
            setNowKey(keys[0]);
          }}
        >
          {values[0]}
        </p>
      )}

      {nowKey === keys[1] ? (
        <p
          className={cl.bigValue}
          onClick={(e) => {
            setNowKey(keys[1]);
          }}
        >
          {values[1]}
        </p>
      ) : (
        <p
          className={cl.value}
          onClick={(e) => {
            setNowKey(keys[1]);
          }}
        >
          {values[1]}
        </p>
      )}
    </div>
  );
};

export default FullPicker;
