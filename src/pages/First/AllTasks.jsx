import React, { memo, useCallback, useEffect, useState } from "react";
import FirstMain from "../../components/First/FirstMain/FirstMain";
import FirstTop from "../../components/First/FirstMain/FirstTop";
import FirstLoader from "../../loaders/FirstLoader";
import { useFilteredArr } from "../../hooks/useFilteredArr";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksInformation } from "../../store/information";
// let count = 0
const AllTasks = ({
  setDetailsActive,
  setMenuActive,
  setSliderActive
}) => {
  // count += 1
  // console.warn('РЕНДЕР' + count )

  console.log('Рендер allTask')
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasksInformation("getOrders"));
  }, [dispatch]);
  const ordersInformation = useSelector(
    (state) => state.information.orderInformations
  );
  // const orderStatus = useSelector((state) => state.information.orderStatus);



  const [filterBy, setFilterBy] = useState("");

  const filteredArr = useFilteredArr(ordersInformation, filterBy);
  const userInfo = useSelector((state) => state.telegramUserInfo);


  const tonConstant = useSelector((state) => state.ton.value);

  return (
    <div className="AllTasks">
      <FirstTop
        filteredBy={filterBy}
        setMenuActive={setMenuActive}
        setFilterBy={setFilterBy}
        userInfo={userInfo}
      />

      {filteredArr !== null && tonConstant !== 0 ? (
        <>
          <FirstMain
            // style={isMenuActive ? { background: "rgba(0,0,0,0.5)" } : {}}
            setDetailsActive={setDetailsActive}
            ordersInformation={filteredArr}
            setSliderActive = {setSliderActive}
          />


        </>
      ) : (
        <FirstLoader />
      )}
    </div>
  );
};

export default memo(AllTasks);
