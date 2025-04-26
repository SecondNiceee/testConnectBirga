import React, { useState } from "react";
import NewProfileCup from "../Profile/components/NewProfileCup/NewProfileCup";
import useGetUserConfig from "./hooks/useGetUserConfig";
import { useSelector } from "react-redux";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import useGetBaidgeOprionsConfig from "./hooks/useGetBaidgeOprionsConfig";
import NewOption from "../Profile/components/NewOption/NewOption";
import TextAboutMe from "../../components/UI/AboutMeText/TextAboutMe";
import Taggs from "./components/Taggs";
import Links from "./components/Links";
import CSSTransitionStatistikPage from "./CSSTransitionStatistikPage";

// gotenConfig = {
//    id : 1
//     counterOfLikes : 12,
//     counterOfNitcheRating : 5,
//     firstName : userInfo.firstName,
//     lastName : userInfo.lastName,
//     photoUrl : photoLink,
//     profession : "Нуб",
//     profileWatches : 12,
//     aboutMe : "",
//     taggs : ""
// 


// const params = { id: 2 };
const params = null
const Baidge = ({ gotenConfig }) => {



  const me = useSelector((state) => state.telegramUserInfo);

  const isMyBaidge =
    gotenConfig?.id === me.id ||
    params?.id === me.id ||
    (!gotenConfig && !params);

  const userConfig = useGetUserConfig({ isMyBaidge, gotenConfig });

  const [isStatistikOpened, setStatistikOpened] = useState(false)

  const optionsConfig = useGetBaidgeOprionsConfig({setStatistikOpened});

  console.log(isStatistikOpened)

  const cards = [
    {
      watches: 2,
    },
    {
      watches: 3,
    },
    {
      watches: 5,
    },
  ];

  if (!userConfig) {
    return <MyLoader />;
  }

  return (
    <>
      <div className="pt-[16px] px-[16px] bg-[#18222d] gap-[16px] flex flex-col h-[100vh] overflow-y-scroll pb-[100px]">
        <NewProfileCup
          isLikeActive={userConfig.isLikeActive}
          isBaidge={true}
          counterOfLikes={userConfig.counterOfLikes}
          positionOfNitcheRating={userConfig.positionOfNitcheRating}
          firstName={userConfig.firstName}
          lastName={userConfig.lastName}
          photoUrl={userConfig.photoUrl}
          profession={userConfig.profession}
          profileWatches={userConfig.profileWatches}
        />

        <div className="flex flex-col rounded-[12px] bg-[#20303f]">
          {optionsConfig.map((option, i) => (
            <NewOption
              numberNearToArrow={option.numberNearToArrow}
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
        <div className="flex flex-col gap-[7px] w-[100%] text-[#84898f]">
              <p className="ml-[17px] leading-4 text-[13px] uppercase font-sf-pro-display-400 tracking-wider">КРАТКОЕ РЕЗЮМЕ</p>
              <TextAboutMe aboutU={userConfig.aboutMe} />
        </div>
        <div className="flex flex-col gap-[7px] w-[100%] text-[#84898f]">
              <p className="ml-[17px] leading-4 text-[13px] uppercase font-sf-pro-display-400 tracking-wider">ТЕГИ</p>
              <Taggs taggs={userConfig.taggs} />
        </div>


        <div className="flex flex-col gap-[7px] w-[100%] text-[#84898f]">
              <p className="ml-[17px] leading-4 text-[13px] uppercase font-sf-pro-display-400 tracking-wider">ССЫЛКИ</p>
              <Links links={userConfig.links}/>
        </div>

      </div>

      <CSSTransitionStatistikPage cards={cards} userConfig={userConfig} isStatisticOpened={isStatistikOpened} />
    </>
  );
};

export default Baidge;
