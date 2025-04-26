import React from "react";
import OrderStatisticUi from "./components/OrderStatisticUi";
import ProfileStatisticComponent from "./components/ProfileStatisticComponent";

const StatisticPage = ({ userConfig, cards }) => {  
  return (
    <div className="pt-[16px] transition-transform duration-300
     fixed left-right w-[100vw] overflow-y-scroll px-[16px] bg-[#18222d] flex flex-col h-[100vh] pb-[100px]">

      <div className="flex flex-col ml-[16px] gap-[2px]">
        <p className="font-sf-pro-display-600 text-[20px] text-white tracking-wider leading-normal">
          Статистика
        </p>
        <p className="font-sf-pro-display text-[17px] leading-[18.3px] text-[#b5ced9]">
          {userConfig.firstName} {userConfig.lastName}
        </p>
      </div>

    <ProfileStatisticComponent cards={cards} userConfig={userConfig} />

    <OrderStatisticUi userConfig={userConfig} />

    </div>
  );
};

export default StatisticPage;
