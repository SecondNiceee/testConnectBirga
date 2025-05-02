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
import CssTransitionedNewCardsPages from "../NewCardsPage/CssTransitionedNewCardsPages";
import useGetUserPhotoLink from "../../hooks/useGetUserPhotoLink";
import { useNavigate } from "react-router";
import BackButton from "../../constants/BackButton";
import CssTransitionNewInnerCase from "../NewInnerCase/CssTransitionNewInnerCase";
import CssTransitionNewChangeCard from "../NewChangeCard/CssTransitionNewChangeCard";
import backButtonController from "./controllers/BackButtonController";
import { likesController } from "./controllers/LikesController";
import { mainButtonController } from "./controllers/MainButtonController";
import MainButton from "../../constants/MainButton";

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





// УЧТИ НУЖНО ДОНАСТРОИТЬ ЛАЙК
const Baidge = ({ gotenUserInfo, setGotenUserInfo }) => {

  const me = useSelector((state) => state.telegramUserInfo);

  const navigate = useNavigate();

  const userInfo = useMemo( () => {
    return gotenUserInfo ?? me
  }, [me, gotenUserInfo] )

  const isLikeActive = useMemo( () => {
    if (!userInfo){
      return null;
    }
    return userInfo.userLikes.map((like) => like.user.id).includes(me.id);
  }, [userInfo, me.id] )

  const photoUrl = useGetUserPhotoLink({userInfo})

  const dispatch = useDispatch();
  
  const [isStatistikOpened, setStatistikOpened] = useState(false)

  const [isPortfolioOpened, setPortfoliosOpened] = useState(false);

  const optionsConfig = useGetBaidgeOprionsConfig({setStatistikOpened, userInfo, setPortfoliosOpened});

  const [card, setCard] = useState(null);
  
  const [isChangingCardOpened, setChangingCardOpened] = useState(false);

  const [isCardPageOpened , setCardPageOpen] = useState(false);



  const fowardFunction = useCallback( () => {
    return mainButtonController.fowardFunction({isCardPageOpened, isChangingCardOpened, myId : me.id, setChangingCardOpened, userInfoId : userInfo.id})
  }, [isCardPageOpened, isChangingCardOpened, me.id, setChangingCardOpened, userInfo.id ] )

  useEffect( () => {
    MainButton.onClick(fowardFunction);
    return ( ) => {
      MainButton.offClick(fowardFunction)
    }
  }, [fowardFunction] )
    
  useEffect(  () => {
    mainButtonController.controlVisability({isCardPageOpened, isChangingCardOpened, myId : me.id, userInfoId : userInfo.id});
  }, [isCardPageOpened, isChangingCardOpened, me.id , userInfo.id]  )



  const backFunction = useCallback( () => {
    backButtonController.backButtonFunction({isCardPageOpened, isPortfolioOpened, isStatistikOpened, navigate, setCardPageOpen, setPortfoliosOpened})
  } , [isStatistikOpened, navigate, isCardPageOpened, isPortfolioOpened, setPortfoliosOpened] )

  useEffect( () => {
    BackButton.onClick(backFunction);
    return () => {
        BackButton.offClick(backFunction);
    }
  } , [backFunction] )

  useEffect( () => {
    backButtonController.controllVisability();
  } , [] )





  const clickLikeUser = () => {
    likesController.likeUser({dispatch : dispatch, userId : me.id, likedUserId : userInfo.id})
  }

  const clickDislikeUser = () => {
    likesController.dislikeUser({dispatch : dispatch, userId : me.id, dislikedUserId : userInfo.id})
  }


  if (!userInfo || userInfo.id === null) {
    return <MyLoader />;
  }

  return (
    <>
      <button onClick={fowardFunction} className="fixed left-1/2 bottom-1/3 z-[1000]">MAIN BUTTON</button>
      <div className="pt-[16px] px-[16px] bg-[#18222d] gap-[16px] flex flex-col h-[100vh] overflow-y-scroll pb-[100px]">
        <NewProfileCup
          isLikeActive={isLikeActive}
          isBaidge={true}
          counterOfLikes={userInfo.userLikes.length}
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

      <CssTransitionNewChangeCard isChangingCardOpened={isChangingCardOpened} card={card}  />

      <CssTransitionedNewCardsPages setCardPageOpen = {setCardPageOpen} setCard = {setCard} isOpened={isPortfolioOpened} userInfo={me} />

      <CSSTransitionStatistikPage setStatistikClose={setStatistikOpened} userConfig={me} isStatisticOpened={isStatistikOpened} />

      <CssTransitionNewInnerCase userInfo={userInfo}  card={card} isOpened={isCardPageOpened}  />

    </>
  );
};

export default Baidge;
