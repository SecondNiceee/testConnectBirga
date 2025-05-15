import React, { useMemo } from "react";
import ProfileCup from "../../Profile/components/ProfileCup/ProfileCup";
import GoToMessageButton from "./GoToMessageButton";
import StatistikComponent from "./StatistikComponent";

const BaidgeWithoutProfile = ({ userInfo, className }) => {
  const statistikConfig = useMemo(() => {
    return [
      {
        title: "Создано заданий",
        text: userInfo?.advertisements?.length,
      },
      {
        title: "Завершено заданий",
        text: userInfo?.advertisements.filter(
          (task) => task.staus === "completed"
        ).length,
      },
    ];
  }, [userInfo.advertisement]);
  return (
    <div
      className={`pt-[37px] fixed left-0 top-0 z-50 px-[16px] bg-[#18222d] flex flex-col h-[100vh] overflow-y-scroll pb-[100px] ${className}`}
    >
      <ProfileCup gotenUserInfo={userInfo} />
      <GoToMessageButton className={"mt-[28px]"} link={userInfo.link} />
      <StatistikComponent
        className={"mt-4"}
        config={statistikConfig}
        title={"Статистика"}
      />
    </div>
  );
};

export default BaidgeWithoutProfile;
