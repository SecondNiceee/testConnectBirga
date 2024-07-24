import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cl from "./CategoryBlock.module.css";
const InputBlock = ({ value, setValue, func = () => {}, ...props }) => {
  const inputRef = useRef(null);
  const textRef = useRef(null);
  const rubRef = useRef(null);
  const [isFocus, setFocus] = useState(false);
  const convertedValue = useMemo(() => {
    if (value === "0") {
      if (isFocus) {
        return "";
      }
    }
    return new Intl.NumberFormat("ru-RU").format(value);
  }, [value, isFocus]);
  useEffect(() => {
    if (inputRef.current.value === "") {
      inputRef.current.style.width = "66px";
    } else {
      inputRef.current.style.width = String(textRef.current.offsetWidth + 6) + "px";
    }
  }, [convertedValue]);

  const unFocusHandler = useCallback(() => {
    if (convertedValue === "") {
      inputRef.current.value = "0";
      inputRef.current.style.width = "8px";
      rubRef.current.style.display = "block";
    }
    setFocus(false);
  }, [convertedValue, setFocus]);

  return (
    <label htmlFor="myInput" style={{width : "110px"}} onClick={func} {...props} className={cl.wrapper}>
      <div className={cl.left}>
        <p className={cl.name}>{"Сумма от"}</p>
        <p ref={textRef} className={cl.hiddenText}>
          {convertedValue}
        </p>
        <div className={cl.inputBlock}>
          <input
            id="myInput"
            inputMode="numeric"
            onFocus={(e) => {
              setFocus(true);
            }}
            onBlur={unFocusHandler}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={convertedValue}
            placeholder="5000 RUB"
            className={cl.input}
            ref={inputRef}
            type="text"
          />
          <p
            ref={rubRef}
            style={convertedValue === "" ? { display: "none" } : {}}
            className={cl.afterText}
          >
            RUB
          </p>
        </div>
      </div>
    </label>
  );
};

export default InputBlock;
