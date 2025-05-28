import React, { useEffect, useMemo } from "react";
import ProfileCup from "../../Profile/components/ProfileCup/ProfileCup";
import GoToMessageButton from "./GoToMessageButton";
import StatistikComponent from "./StatistikComponent";
import { getAdvertisementsByUserId } from "../../../functions/api/getAdvertisementsByUserId";
import BaidgeAdvertisements from "./BaidgeAdvertisements";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";
import StatistikOption from "./StatistikOption";
import formatDate from "../../../functions/makeDate";
import useGetIsResponsed from "../hooks/useGetIsResponsed";

const BaidgeWithoutProfile = ({ userInfo, setUserInfo,className }) => {

  const {isResponsed} = useGetIsResponsed({consumerId : userInfo.id})

  useEffect( () => {
    getAdvertisementsByUserId(userInfo).then((advertisements) => {
      setUserInfo((userInfo) => ({...userInfo, advertisements}))
    })
  },[setUserInfo] )
  

  const statistikConfig = useMemo(() => {
    return [
      {
        title: "Создано заданий",
        text: userInfo?.advertisements?.length,
      },
      {
        title: "Завершено заданий",
        text: userInfo?.advertisements?.filter(
          (task) => task.status === "completed"
        ).length,
      }
    ];
  }, [userInfo.advertisements]);
  if (!userInfo.advertisements){
    return <MyLoader />
  }
  return (
    <div
      className={`pt-[37px] w-full  z-50 px-[16px] bg-[#18222d] flex flex-col h-[100vh] overflow-y-scroll pb-[100px] ${className}`}
    >
      <ProfileCup gotenUserInfo={userInfo} />
      <GoToMessageButton isActive={isResponsed} className={"mt-[28px]"} link={userInfo.link} />
      <StatistikComponent
        className={"mt-4"}
        config={statistikConfig}
        title={"Статистика"}
      />
        <div className="flex mt-[7.67px] flex-col rounded-[12px] bg-[#20303f]">
              <StatistikOption text={userInfo.completedTasks} title={"Выполнено заданий"} configLength={1} index={0}  />
        </div>
      <BaidgeAdvertisements advertisements={userInfo.advertisements}  />
      <p className="text-[11.667px] mx-auto font-sf-pro-display leading-[12.535px] tracking-[0.117px] text-[#95979E] mt-[11.67px]">На Connect с {formatDate(new Date(userInfo.createdAt), false, false, true)}</p>
    </div>
  );
};

export default BaidgeWithoutProfile;
