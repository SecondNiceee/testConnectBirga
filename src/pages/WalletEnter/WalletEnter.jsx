import React, { useCallback, useEffect, useMemo, useState } from "react";
import cl from "./WalletEnter.module.scss";

import { mnemonicNew } from "ton-crypto";


import One from "./components/One/One";
import Two from "./components/Two/Two";


import useButton from "./hooks/useButton";
import useMenu from "./hooks/useMenu";
import useKeys from "./hooks/useKeys";




const numbers = [2, 3, 4, 6, 8, 9];

const WalletEnter = () => {
  const [keys, setKeys] = useState(null);
  const [step, setStep] = useState(0)
  const [values, setValues] = useState([
    "", "", "" , "", "", ""
])
  const [mistakes, setMistakes] = useState([false, false, false, false, false, false])

  useEffect( () => {
    document.documentElement.style.overflowY = "auto"
    return () => {
      document.documentElement.style.overflowY = "hidden"
    }
  } , [] )

  useMenu()

  useButton({step, setStep, keys, values, setMistakes, mistakes, numbers})

  useKeys({setKeys})

  
  const style = useMemo( () => {
    if (step){
      return {
        transform : "translateX(-100vw)"
      }
    }
    return {}
  } , [step] )
  
  const changeHandler = useCallback( (val, index) => {
        setValues( (value) => ([...value.map((e,i) => index === i ? val : e) ]) )
    } , [] )

  return (
    <div style={style} className={cl.wrapper}>
        <One keys={keys} />
        <Two numbers={numbers} values={values} mistakes={mistakes} changeHandler={changeHandler}  />
    </div>
  );
};

export default WalletEnter;
