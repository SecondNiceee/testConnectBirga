import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, transform } from "framer-motion";

import BackButton from "../../constants/BackButton";

import MainButton from "../../constants/MainButton";
import useListner from "../../hooks/useListner";
import AllTasks from "./AllTasks";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuActive } from "../../store/menuSlice";
import Responce from "./Responce";

let varStep = 0
const First = () => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(0);

  const [isDetailsActive, setDetailsActive] = useState({
    id: 0,
    isOpen: false,
  });


  // function closeDetails() {
  //   setDetailsActive({ ...isDetailsActive, isOpen: false });
  // }


  console.log(varStep)

    
    useEffect( () => {


      function forward() {
        console.log(varStep)
        if (varStep === 0) {
          alert()
          setStep(step + 1);
          varStep += 1
        }
      }
    
      function back(){
        console.log('бэк')
        console.log(varStep)
        if (varStep > 0){
          setStep(step - 1)
          varStep -= 0.5
          return true
        }
        else{
          setDetailsActive(false)
          return true
        }
      }



      MainButton.onClick(forward);
      BackButton.onClick(back);
      return () => {
        varStep = 0
        MainButton.offClick(forward)
        BackButton.offClick(back)

      }
     
    }, [] )


    BackButton.hide();
    MainButton.hide();
    if (isDetailsActive.isOpen) {
      BackButton.show();
      MainButton.show();

    }
    if (step === 0) {
      MainButton.setText("ОТКЛИКНУТЬСЯ");
    }
    if (step === 1) {
      MainButton.setText("Далее");
    }



  const isMenuActive = useSelector((state) => state.menu.value);

  const setMenuActive = useCallback(
    (set) => {
      dispatch(changeMenuActive(set));
    },
    [dispatch]
  );

  const style = useMemo(() => {
    console.log("вызов style");
    switch (step) {
      case 0:
        return {
          transform: "translateX(0%)",
        };
      case 1:
        return {
          transform: "translateX(-100%)",
        };
    }
  }, [step]);

  useListner({
    isMenuActive,
    setMenuActive,
    setDetailsActive,
    isDetailsActive,
  });

  const ordersInformation = useSelector(
    (state) => state.information.orderInformations
  );

  return (
    <motion.div
      style={isMenuActive ? { opacity: "0.3" } : {}}
      className="First"
      onClick={() => {
        if (isMenuActive) {
          setMenuActive(false);
        }
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, duration: 0 }}
    >
      <div className="first-wrapper" style={style}>
        <AllTasks
          ordersInformation={ordersInformation}
          isDetailsActive={isDetailsActive}
          setDetailsActive={setDetailsActive}
          setMenuActive={setMenuActive}
          isMenuActive={isMenuActive}
        />

        <Responce orderInformation={ordersInformation[isDetailsActive.id]} />
      </div>
    </motion.div>
  );
};

export default First;
