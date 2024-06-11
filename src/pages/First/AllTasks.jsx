import React, { memo, useCallback, useEffect, useState } from "react";
import FirstMain from "../../components/First/FirstMain/FirstMain";
import FirstTop from "../../components/First/FirstMain/FirstTop";
import FirstDetails from "../../components/First/FirstDetails/FirstDetails";
import FirstLoader from "../../loaders/FirstLoader";
import { useFilteredArr } from "../../hooks/useFilteredArr";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuActive } from "../../store/menuSlice";
import { fetchTasksInformation } from "../../store/information";
import { CSSTransition } from "react-transition-group";

const AllTasks = ({isDetailsActive , setDetailsActive ,isMenuActive, setMenuActive, ordersInformation}) => {


    const dispatch = useDispatch();
    useEffect( () => {
      dispatch ( fetchTasksInformation('getOrders') )
    } , [] )

    const orderStatus = useSelector(
      (state) => state.information.orderStatus
    )
  
  

    const [filterBy, setFilterBy] = useState("");



    const filteredArr = useFilteredArr(ordersInformation, filterBy);
    const userInfo = useSelector(state => state.telegramUserInfo);





  return (
    <div className="AllTasks">
      <FirstTop
        style={isMenuActive ? { opacity: "0.5" } : {}}
        setMenuActive={setMenuActive}
        setFilterBy={setFilterBy}
        userInfo={userInfo}
      />

      {orderStatus === "complete" ? (
        <>
          <FirstMain
            style={isMenuActive ? { background: "rgba(0,0,0,0.5)" } : {}}
            setDetailsActive={setDetailsActive}
            ordersInformation={filteredArr}
          />

          {/* <CSSTransition
            in={isDetailsActive.isOpen}
            
            timeout={200}
            classNames="left-right"
            mountOnEnter
            unmountOnExit
          > */}
            <FirstDetails
              className={isDetailsActive.isOpen === true ? "active" : ""}
              setDetailsActive={setDetailsActive}
              isDetailsActive={isDetailsActive}
              orderInformation={ordersInformation[isDetailsActive.id]}
              similarAds={ordersInformation}
            />
          {/* </CSSTransition> */}
        </>
      ) : (
        <FirstLoader />
      )}
    </div>
  );
};

export default memo(AllTasks);
