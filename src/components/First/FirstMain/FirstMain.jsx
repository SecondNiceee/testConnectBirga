import React, { memo, useCallback } from "react";
import FirstBlock from "./FirstBlock";
import { useDispatch, useSelector } from "react-redux";
import { addWatch } from "../../../store/watchedAds";
const FirstMain = ({ ordersInformation, setDetailsActive , ...props}) => {
  const watchedArr = useSelector(state => state.watchedAds.watchedAds)
  const dispatch = useDispatch()
  console.log('РЕНДЕР')
  const setDetailsActiveF = useCallback( (e,i) => {
    setDetailsActive({isOpen : true , id : i})
    // dispatch(addWatch(e.id))
  } , [] )
  return (
    <div {...props} className="FirstMain">

      {ordersInformation.length === 0 ? (
        <h1 className="EmptyText"> Нет таких предложений </h1>
      ) : (
        ordersInformation.map((e,i) => {
          return <FirstBlock key={i} setDetailsActive={() => {
            setDetailsActiveF(e, i)
          }}   {...e} isButton = {true} />;
        })
      )}

    </div>
  );
};

export default memo(FirstMain);
