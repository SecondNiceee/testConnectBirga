import React from "react";
import upDown from "../../../images/icons/UpDown.svg";
import FullPicker from "../../../components/UI/FullPicker/FullPicker";
const values = ["Я испольнитель", "Я заказчик"];
const keys = ["freelancer", "customer"];

const MyAdsBlock = ({deals , nowValue, setNowKey, finishedDeals , greyWidth , greyIntWidth }) => {



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
        <div className="sortBy">
          <p className="sortByPar">Активный</p>
          <img className="upDown" src={upDown} alt="" />
        </div>
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

export default MyAdsBlock;
