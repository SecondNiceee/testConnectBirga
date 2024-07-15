import React, { memo, useMemo } from "react";
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

      {keys.map((e, i) => {
        return (
          <>
            {nowKey === keys[i] ? (
              <p key={i}
                className={cl.bigValue}
                onClick={(e) => {
                  setNowKey(keys[i]);
                }}
              >
                {values[i]}
              </p>
            ) : (
              <p key={i}
                className={cl.value}
                onClick={(e) => {
                  setNowKey(keys[i]);
                }}
              >
                {values[i]}
              </p>
            )}
            <div className={cl.loup} style={i === keys.length - 1 ? {display : "none"} : {}}></div>

          </>
        )
      })}


      







    </div>
  );
};

export default memo(FullPicker);
