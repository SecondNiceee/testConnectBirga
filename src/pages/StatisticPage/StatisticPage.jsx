import OrderStatisticUi from "./components/OrderStatisticUi";
import ProfileStatisticComponent from "./components/ProfileStatisticComponent";
import useNavigateBack from "../../hooks/useNavigateBack";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import menuController from "../../functions/menuController";


const StatisticPage = () => {  
  const userConfig = useSelector( (state) => state.information.baidgeUser );
  useNavigateBack({isSliderOpened : false, setSlideOpened : false});
  useEffect( () => {
    menuController.hideMenu();
  }, [] )

  return (
    <div className="pt-[16px] transition-transform w-full px-[16px] pb-[16px] bg-[#18222d] flex flex-col">

      <div className="flex flex-col ml-[16px] gap-[2px]">
        <p className="font-sf-pro-display-600 text-[20px] text-white tracking-wider leading-normal">
          Статистика
        </p>
        <p className="font-sf-pro-display text-[17px] leading-[18.3px] text-[#b5ced9]">
          {userConfig.firstName} {userConfig.lastName}
        </p>
      </div>

    <ProfileStatisticComponent userConfig={userConfig} />

    <OrderStatisticUi userConfig={userConfig} />

    </div>
  );
};

export default StatisticPage;
