import React, { useCallback, useEffect, useMemo, useState } from "react";
import NewProfileCup from "../Profile/components/NewProfileCup/NewProfileCup";
import { useDispatch, useSelector } from "react-redux";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import useGetBaidgeOprionsConfig from "./hooks/useGetBaidgeOprionsConfig";
import NewOption from "../Profile/components/NewOption/NewOption";
import TextAboutMe from "../../components/UI/AboutMeText/TextAboutMe";
import Taggs from "./components/Taggs";
import Links from "./components/Links";
import CSSTransitionStatistikPage from "./CSSTransitionStatistikPage";
import { dislikeUser, likeUser } from "../../store/telegramUserInfo";
import CssTransitionedNewCardsPages from "../NewCardsPage/CssTransitionedNewCardsPages";
import useGetUserPhotoLink from "../../hooks/useGetUserPhotoLink";
import { useNavigate } from "react-router";
import pagesHistory from "../../constants/pagesHistory";
import BackButton from "../../constants/BackButton";
import CssTransitionNewInnerCase from "../NewInnerCase/CssTransitionNewInnerCase";

// id : userConfig.id,
// counterOfLikes: userInfo.userLikes.length,
// positionOfNitcheRating: "-",
// firstName: userInfo.firstName,
// lastName: userInfo.lastName,
// photoUrl: photoLink,
// positionOfCommonRating : "-",
// profession: userInfo.profession.profession,
// profileWatches: userInfo.views,
// isLikeActive: userInfo.userLikes.includes(userInfo.id),
// ratingCounter : userInfo.rating,
// aboutMe: userInfo.profile.about ,
// telegramProfileLink: userInfo.link,
// links : userInfo.links,
// stage : userInfo.stage,
// completedTasks : userInfo.completedTasks,
// secureTask : "-",
// numberOfResponses : counterOfResponses,
// customerOffers : "-",
// taggs : userInfo.taggs


// const params = { id: 2 };
// const params = null
const Baidge = ({ gotenUserInfo }) => {

  const me = useSelector((state) => state.telegramUserInfo);

  const navigate = useNavigate();

  const userInfo = useMemo( () => {
    return gotenUserInfo ?? me
  }, [me, gotenUserInfo] )

  const isLikeActive = useMemo( () => {
    if (!userInfo){
      return null;
    }
    return userInfo.userLikes.map((like) => like.likedUser.id).includes(userInfo.id);
  }, [userInfo] )

  const photoUrl = useGetUserPhotoLink({userInfo})

  const dispatch = useDispatch();
  
  const [isStatistikOpened, setStatistikOpened] = useState(false)

  const [isPortfolioOpened, setPortfoliosOpened] = useState(false);

  const optionsConfig = useGetBaidgeOprionsConfig({setStatistikOpened, userInfo, setPortfoliosOpened});

  const [card, setCard] = useState(null);
  

  const backFunction = useCallback( () => {
    if (!isStatistikOpened){
      if (!card){
        if (!isPortfolioOpened){
          
          if (pagesHistory.length > 0){
            navigate(-1)
          }
          navigate('/')
        }
        else{
          setPortfoliosOpened(false);
        }
      }
      else{
        setCard(false);
      }
    }
  } , [isStatistikOpened, navigate, card, isPortfolioOpened, setPortfoliosOpened] )

  useEffect( () => {
    BackButton.show();
    BackButton.onClick(backFunction);
    return () => {
        BackButton.offClick(backFunction);
    }
  } , [backFunction] )
    
  const clickLikeUser = () => {
    dispatch(likeUser({
      userId : me.id,
      likedUserId : userInfo.id
    }))
  }

  const clickDislikeUser = () => {
    dispatch(dislikeUser({
      userId : String(me.id),
      dislikedUserId : String(userInfo.id)
    }))
  }

  console.log(card);

  if (!userInfo || userInfo.id === null) {
    return <MyLoader />;
  }

  return (
    <>
      <div className="pt-[16px] px-[16px] bg-[#18222d] gap-[16px] flex flex-col h-[100vh] overflow-y-scroll pb-[100px]">

        <NewProfileCup
          isLikeActive={isLikeActive}
          isBaidge={true}
          counterOfLikes={0}
          positionOfNitcheRating={0}
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          photoUrl={photoUrl}
          profession={userInfo.profession.profession}
          profileWatches={userInfo.views}
          likeUser = {clickLikeUser}
          clickDislikeUser = {clickDislikeUser}
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
              <TextAboutMe aboutU={userInfo.profile.about} />
        </div>
        <div className="flex flex-col gap-[7px] w-[100%] text-[#84898f]">
              <p className="ml-[17px] leading-4 text-[13px] uppercase font-sf-pro-display-400 tracking-wider">ТЕГИ</p>
              <Taggs taggs={userInfo.taggs} />
        </div>


        <div className="flex flex-col gap-[7px] w-[100%] text-[#84898f]">
              <p className="ml-[17px] leading-4 text-[13px] uppercase font-sf-pro-display-400 tracking-wider">ССЫЛКИ</p>
              <Links links={userInfo.links}/>
        </div>

      </div>

      <CssTransitionedNewCardsPages setCard = {setCard} isOpened={isPortfolioOpened} userInfo={me} />

      <CSSTransitionStatistikPage setStatistikClose={setStatistikOpened} userConfig={me} isStatisticOpened={isStatistikOpened} />

      <CssTransitionNewInnerCase userInfo={userInfo}  card={card} isOpened={card}  />

    </>
  );
};

export default Baidge;
