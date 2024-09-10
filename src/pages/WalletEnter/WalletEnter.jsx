import React, { useCallback, useEffect, useState } from "react";
import cl from "./WalletEnter.module.scss";

import { mnemonicNew } from "ton-crypto";

import MainButton from "../../constants/MainButton";
import One from "./components/One/One";
import Two from "./components/Two/Two";





const WalletEnter = ({ className }) => {
  const [keys, setKeys] = useState(null);
  const [step, setStep] = useState(0)
  const [values, setValues] = useState([
    "", "", "" , "", "", ""
])
const [mistakes, setMistakes] = [false, false, false, false, false, false]


  useEffect( () => {
    const menu = document.documentElement.querySelector(".FirstMenu");

    if (menu){
      menu.classList.add("disappearAnimation")
      menu.classList.remove("appearAnimation")
    }

  } , [] )

  const checkFunction = useCallback( () => {
      const mistakesCopy = [false, false, false, false, false, false]
      keys.forEach((element, i) => {
        if (element !== values[i]){
          mistakesCopy[i] = true
        }
      });
      setMistakes(mistakesCopy)
  }, [keys, values, setMistakes] )

  const saveFunction = useCallback( () => {
      if (checkFunction()){
        alert("Создать кошель")   
      }
  } , [checkFunction] )

  useEffect( () => {


    const forwardFunction = () => {
      if (step === 0){
        setStep((value) => (value + 1))
      }
      else{

      }
    }

    
    if (step === 0){
      MainButton.setText("ПРОДОЛЖИТЬ")
    }
    else{
      MainButton.setText("СОЗДАТЬ КОШЕЛЕК")
    }


    MainButton.show()
    MainButton.onClick(forwardFunction)
    return () => {
      MainButton.offClick(forwardFunction)
    }
  } , [step] )


  useEffect(() => {
    const getKeys = async () => {
      const keys = await mnemonicNew(12);
      return keys;
    };
    getKeys().then((value) => setKeys(value));
  }, []);






  const changeHandler = useCallback( (val, index) => {
        setValues( (value) => ([...value.map((e,i) => index === i ? val : e) ]) )
    } , [] )


  return (
    <div className={cl.wrapper}>
        <One keys={keys} />
        <Two values={values} mistakes={mistakes} changeHandler={changeHandler}  />
    </div>
  );
};

export default WalletEnter;
