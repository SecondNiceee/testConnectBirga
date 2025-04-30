import React, { useEffect } from "react";
import PayBlock from "./components/PayBlock/PayBlock";
import useGetOptionsConfig from "./hooks/useGetOptionsConfig";
import NewOption from "./components/NewOption/NewOption";
import NewProfileCup from "./components/NewProfileCup/NewProfileCup";
import useGetUserPhotoLink from "../../hooks/useGetUserPhotoLink";
import { useSelector } from "react-redux";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import ProfileCup from "./components/ProfileCup/ProfileCup";
import pagesHistory from "../../constants/pagesHistory";

const NewProfile = () => {
  const optionsConfig = useGetOptionsConfig();

  const photoLink = useGetUserPhotoLink({});

  const userInfo = useSelector((state) => state.telegramUserInfo);

  useEffect( () => {
    pagesHistory.push("/Profile")
  }, [] );

  
  if (userInfo.state !== "yes"){
    return <MyLoader />
  }
  return (
    <div className="pt-[16px] px-[16px] bg-[#18222d] gap-[16px] flex flex-col h-[100vh] overflow-y-scroll pb-[100px]">

      {userInfo.profession ?  <NewProfileCup
        counterOfLikes={userInfo.userLikes.length}
        isLikeActive={false}
        isBaidge = {false}
        firstName={userInfo.firstName}
        lastName={userInfo.lastName}
        photoUrl={photoLink}
        profession={userInfo.profession.profession}
        profileWatches={userInfo.views}
      /> : <ProfileCup />}


      <PayBlock className="pay-block" />

      <div className="flex flex-col rounded-[12px] bg-[#20303f]">
        {optionsConfig.map((option, i) => (
          <NewOption
            imgPath={option.imgPath}
            isNededToFill={option.isNeededFill}
            neededActiveButton={option.isNeededActiveTitle}
            text={option.text}
            key={i}
            isNeededBorder={i !== Number(optionsConfig.length - 1)}
            isAloneElement={false}
          onClick={option.clickFunc}
          />
        ))}
      </div>

      <NewOption
        isAloneElement={true}
        imgPath={"/images/newProfile/subscription.svg"}
        isNededToFill={false}
        neededActiveButton={true}
        text={"Подписка"}
      />

      <NewOption
        isAloneElement={true}
        imgPath={"/images/newProfile/refSystemIcon.svg"}
        isNededToFill={false}
        neededActiveButton={false}
        text={"Реферальная система"}
      />

    </div>
  );
};

export default NewProfile;
