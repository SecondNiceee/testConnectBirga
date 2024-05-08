import React, { useCallback, useEffect, useMemo, useState } from "react";
import {  CSSTransition } from "react-transition-group";
import { motion } from "framer-motion";

import FirstTop from "../../components/First/FirstMain/FirstTop";
import FirstMain from "../../components/First/FirstMain/FirstMain";
import FirstDetails from "../../components/First/FirstDetails/FirstDetails";
import BackButton from '../../constants/BackButton'

import { useFilteredArr } from "../../hooks/useFilteredArr";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuActive } from "../../store/menuSlice";
import MainButton from "../../constants/MainButton";
import useListner from "../../hooks/useListner";


const First = () => {

  const dispatch = useDispatch();

  const ordersInformation = useSelector(
    (state) => state.information.orderInformations
  );


  const isMenuActive = useSelector((state) => state.menu.value);

  const setMenuActive = useCallback( (set) => {
    dispatch(changeMenuActive(set));
  } , [dispatch])
  

  const [filterBy, setFilterBy] = useState("");

  const filteredArr = useFilteredArr(ordersInformation, filterBy);

  const [isDetailsActive, setDetailsActive ] = useState(false);
  useEffect(() => {
    BackButton.hide()
    MainButton.hide()
  } )

    
   useListner({isMenuActive, setMenuActive , setDetailsActive, isDetailsActive  }    )

   const userInfo = useSelector(state => state.telegramUserInfo)

  return (
    <motion.div
      style={isMenuActive ? { opacity: "0.3" } : {}}
      className="First"
      onClick={() => {
        if (isMenuActive) {
          setMenuActive(false);
        }
      }}

      initial={{ opacity: 0,  }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <FirstTop
        style={isMenuActive ? { opacity: "0.5" } : {}}
        setMenuActive={setMenuActive}
        setFilterBy={setFilterBy}
        userInfo = {userInfo}
      />

      <FirstMain
        style={isMenuActive ? { background: "rgba(0,0,0,0.5)" } : {}}
        setDetailsActive={setDetailsActive}
        ordersInformation={filteredArr}
      />

      <CSSTransition
        in={isDetailsActive}
        timeout={200}
        mountOnEnter
        unmountOnExit
        classNames="left-right"
      >
        <FirstDetails
          className="FirstDetails"
          setDetailsActive={setDetailsActive}
          isDetailsActive={isDetailsActive}
          orderInformation={ordersInformation[0]}
          similarAds={ordersInformation}
        />
      </CSSTransition>
    </motion.div>
  );
};

export default First;
