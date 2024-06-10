import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

import BackButton from "../../constants/BackButton";

import MainButton from "../../constants/MainButton";
import useListner from "../../hooks/useListner";
import AllTasks from "./AllTasks";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuActive } from "../../store/menuSlice";
import Responce from "./Responce";

const First = () => {
  const dispatch = useDispatch();

  const [isDetailsActive, setDetailsActive] = useState({
    id: 0,
    isOpen: false,
  });

  useEffect(() => {
    BackButton.hide();
    MainButton.hide();
    if (isDetailsActive.isOpen) {
      MainButton.show();
      MainButton.setText("ОТКЛИКНУТЬСЯ");
    }
  });

  const isMenuActive = useSelector((state) => state.menu.value);

  const setMenuActive = useCallback(
    (set) => {
      dispatch(changeMenuActive(set));
    },
    [dispatch]
  );

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
      <AllTasks
        ordersInformation={ordersInformation}
        isDetailsActive={isDetailsActive}
        setDetailsActive={setDetailsActive}
        setMenuActive={setMenuActive}
        isMenuActive={isMenuActive}
      />


      <Responce orderInformation ={ ordersInformation[isDetailsActive.id]}  />

    </motion.div>
  );
};

export default First;
