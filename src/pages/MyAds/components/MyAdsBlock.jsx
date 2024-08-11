import React, { memo, useMemo } from "react";
import FullPicker from "../../../components/UI/FullPicker/FullPicker";
import ModalChoicer from "../../../components/UI/ModalChoicer/ModalChoicer";
import { useSelector } from "react-redux";
const values = ["Я исполнитель", "Я заказчик"];
const keys = ["freelancer", "customer"];
const MyAdsBlock = ({  nowValue, setNowKey,  greyWidth , greyIntWidth, setOneValue, setTwoValue  }) => {
  const me = useSelector(state => state.telegramUserInfo)
  const responses = useSelector(state => state.responses.responses)
  const advertisements = useSelector(state => state.information.myAdsArray)
  const finishedDeals = useMemo( () => {
    let rezult = String((me.deals + me.completedTasks.length) / (advertisements.length + responses.length) * 100 ).slice(0,2) + " %"
    console.log(rezult)
    return isNaN((me.deals + me.completedTasks.length) / (advertisements.length + responses.length) * 100) ? "0%" : rezult

  } , [advertisements,responses, me.completedTasks.length, me.deals] )
  return (
    <div className="MyAdsBlock">
      <div className="counter__block">
        <div className="number-of-transactions">
          <p>{me.deals}</p>
          <p>Количество сделок</p>
        </div>
        <div className="number-of-transactions">
          <p>{finishedDeals}</p>
          <p>Завершенные сделки</p>
        </div>
      </div>
      <div className="YourAds">
        <p>Ваши объявления</p>
        <ModalChoicer style = {nowValue === "customer" ? {display : "none"} : {}} values={["all" , "inProcess" , "watched" , "unWatched", "completed"]} names={["Все", "В работе", "Просмотренные", "Непросмотренные", "Завершенные"]} setValue={setOneValue} defaultValue={"all"} />
        
        <ModalChoicer style = {nowValue === "customer" ? {} : {display : "none"}} values={["all" , "active", "inProcess" , "completed"]} names={["Все" , "Активные" , "В работе" , "Завершенные"]} setValue={setTwoValue} defaultValue={"all"} />
        
      </div>
      <div className="pick">
        <FullPicker
        GreyIntWidth={greyIntWidth}
        GreyWidth={greyWidth}
          className={"MyAds__FullPicker"}
          values={values}
          nowKey={nowValue}
          setNowKey={setNowKey}
          keys={keys}
        />
      </div>
    </div>
  );
};

export default memo(MyAdsBlock);
