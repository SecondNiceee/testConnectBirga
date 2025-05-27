import React, { useEffect, useMemo } from "react";
import ProfileCup from "../../Profile/components/ProfileCup/ProfileCup";
import GoToMessageButton from "./GoToMessageButton";
import StatistikComponent from "./StatistikComponent";
import { getAdvertisementsByUserId } from "../../../functions/api/getAdvertisementsByUserId";
import BaidgeAdvertisements from "./BaidgeAdvertisements";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";

const BaidgeWithoutProfile = ({ userInfo, setUserInfo,className }) => {
  useEffect( () => {
    getAdvertisementsByUserId(userInfo).then((advertisements) => {
      setUserInfo((userInfo) => ({...userInfo, advertisements}))
    })
  },[setUserInfo] )

  console.log(userInfo)
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
      },
      {
        title : "Выполнено заданий",
        text : userInfo.completedTasks
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
      <GoToMessageButton className={"mt-[28px]"} link={userInfo.link} />
      <StatistikComponent
        className={"mt-4"}
        config={statistikConfig}
        title={"Статистика"}
      />
      <BaidgeAdvertisements advertisements={userInfo.advertisements}  />
    </div>
  );
};

export default BaidgeWithoutProfile;
