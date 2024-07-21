import React, { memo } from "react";
import upDown from "../../../images/icons/UpDown.svg";
import FullPicker from "../../../components/UI/FullPicker/FullPicker";
import ModalChoicer from "../../../components/UI/ModalChoicer/ModalChoicer";
const values = ["Я исполнитель", "Я заказчик"];
const keys = ["freelancer", "customer"];
const MyAdsBlock = ({deals , nowValue, setNowKey, finishedDeals , greyWidth , greyIntWidth, setOneValue, setTwoValue  }) => {


  return (
    <div className="MyAdsBlock">
      <div className="counter__block">
        <div className="number-of-transactions">
          <p>{deals}</p>
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
