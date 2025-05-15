import React, { useCallback, useEffect, useMemo, useState } from "react";
import NewProfileCup from "../../Profile/components/NewProfileCup/NewProfileCup";
import NewOption from "../../Profile/components/NewOption/NewOption";
import { useDispatch, useSelector } from "react-redux";
import useGetUserPhotoLink from "../../../hooks/useGetUserPhotoLink";
import useGetBaidgeOprionsConfig from "../hooks/useGetBaidgeOprionsConfig";
import { likesController } from "../controllers/LikesController";
import Taggs from "./Taggs";
import Links from "./Links";
import TextAboutMe from "../../../components/UI/AboutMeText/TextAboutMe";
import CssTransitionNewInnerCase from "../../NewInnerCase/CssTransitionNewInnerCase";
import CSSTransitionStatistikPage from "../CSSTransitionStatistikPage";
import CssTransitionedNewCardsPages from "../../NewCardsPage/CssTransitionedNewCardsPages";
import CssTransitionNewChangeCard from "../../NewChangeCard/CssTransitionNewChangeCard";
import { mainButtonController } from "../controllers/MainButtonController";
import { secondaryButtonController } from "../controllers/SecondaryButtonController";
import { SecondatyButton } from "../../../constants/SecondaryButton";
import MainButton from "../../../constants/MainButton";
import backButtonController from "../controllers/BackButtonController";
import { useNavigate } from "react-router";
import BackButton from "../../../constants/BackButton";
import useMenuController from "../hooks/useMenuController";

const BaidgeWithProfile = ({ userInfo, isSliderOpened , setSlideOpened, setPhotos, setPhotoIndex, setBaidgeClose, className}) => {
  const [isChangingCardOpened, setChangingCardOpened] = useState(false);

  const [isCardPageOpened, setCardPageOpen] = useState(false);

  const [cardId, setCardId] = useState( 0 )
  
  const [isStatistikOpened, setStatistikOpened] = useState(false);

  const [isPortfolioOpened, setPortfoliosOpened] = useState(false);

  const navigate = useNavigate();

  const me = useSelector((state) => state.telegramUserInfo);

  const dispatch = useDispatch();

  useMenuController({isPortfolioOpened});

  const fowardFunction = useCallback(() => {    
    return mainButtonController.fowardFunction({
      isCardPageOpened,
      isPortfolioOpened,
      isChangingCardOpened,
      setCardId,
      myId: me.id,
      setChangingCardOpened,
      userInfoId: userInfo.id,
      isSliderOpened,
    });
  }, [
    isCardPageOpened,
    isChangingCardOpened,
    me.id,
    setChangingCardOpened,
    isPortfolioOpened,
    userInfo.id,
    isSliderOpened,
    setCardId,
  ]);

  useEffect(() => {
    secondaryButtonController.controllVisabiliry({
      isCardPageOpened,
      isSliderOpened,
      isChangingCardOpened,
    });
  }, [isCardPageOpened, isSliderOpened, isChangingCardOpened]);

  const secondButtonHandler = useCallback(() => {
    secondaryButtonController.secondaryButtonHandler({
      cardId: cardId,
      dispatch,
      setCardPageOpen,
    });
  }, [cardId, setCardPageOpen, dispatch]);

  useEffect(() => {
    SecondatyButton.onClick(secondButtonHandler);
    return () => {
      SecondatyButton.offClick(secondButtonHandler);
    };
  }, [secondButtonHandler]);

  useEffect(() => {
    MainButton.onClick(fowardFunction);
    return () => {
      MainButton.offClick(fowardFunction);
    };
  }, [fowardFunction]);

  useEffect(() => {
    mainButtonController.controlVisability({
      isCardPageOpened,
      isChangingCardOpened,
      isPortfolioOpened,
      myId: me.id,
      userInfoId: userInfo.id,
      isSliderOpened,
    });
  }, [
    isCardPageOpened,
    isChangingCardOpened,
    me.id,
    userInfo.id,
    isPortfolioOpened,
    isSliderOpened,
  ]);

  const backFunction = useCallback(() => {
    backButtonController.backButtonFunction({
      isCardPageOpened,
      isChangingCardOpened,
      isSliderOpened,
      isPortfolioOpened,
      isStatistikOpened,
      navigate,
      setCardPageOpen,
      setBaidgeClose,
      setPortfoliosOpened,
    });
  }, [
    isStatistikOpened,
    navigate,
    isCardPageOpened,
    isPortfolioOpened,
    setPortfoliosOpened,
    isSliderOpened,
    isChangingCardOpened,
    setBaidgeClose,
  ]);

  useEffect(() => {
    BackButton.onClick(backFunction);
    return () => {
      BackButton.offClick(backFunction);
    };
  }, [backFunction]);

  useEffect(() => {
    backButtonController.controllVisability();
  }, []);

  const isLikeActive = useMemo(() => {
    if (!userInfo) {
      return null;
    }
    return userInfo.userLikes.map((like) => like.user.id).includes(me.id);
  }, [userInfo, me.id]);

  const photoUrl = useGetUserPhotoLink(userInfo);

  const optionsConfig = useGetBaidgeOprionsConfig({
    setStatistikOpened,
    userInfo,
    setPortfoliosOpened,
  });

  const clickLikeUser = () => {
    likesController.likeUser({
      dispatch: dispatch,
      userId: me.id,
      likedUserId: userInfo.id,
    });
  };

  const clickDislikeUser = () => {
    likesController.dislikeUser({
      dispatch: dispatch,
      userId: me.id,
      dislikedUserId: userInfo.id,
    });
  };

  return (
    <>
      <div className={`pt-[16px] fixed left-0 top-0 z-50 px-[16px] bg-[#18222d] gap-[16px] flex flex-col h-[100vh] overflow-y-scroll pb-[100px] ${className}`}>
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
          likeUser={clickLikeUser}
          clickDislikeUser={clickDislikeUser}
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
          <p className="ml-[17px] leading-4 text-[13px] uppercase font-sf-pro-display-400 tracking-wider">
            КРАТКОЕ РЕЗЮМЕ
          </p>
          <TextAboutMe aboutU={userInfo.profile.about} />
        </div>
        <div className="flex flex-col gap-[7px] w-[100%] text-[#84898f]">
          <p className="ml-[17px] leading-4 text-[13px] uppercase font-sf-pro-display-400 tracking-wider">
            ТЕГИ
          </p>
          <Taggs taggs={userInfo.taggs} />
        </div>

        <div className="flex flex-col gap-[7px] w-[100%] text-[#84898f]">
          <p className="ml-[17px] leading-4 text-[13px] uppercase font-sf-pro-display-400 tracking-wider">
            ССЫЛКИ
          </p>
          <Links links={userInfo.links} />
        </div>
      </div>
      <CssTransitionNewChangeCard
        setChangingCardOpened={setChangingCardOpened}
        isChangingCardOpened={isChangingCardOpened}
        card={userInfo.profile.cards.find((card) => card.id === cardId)}
      />

      <CssTransitionedNewCardsPages
        setSlideOpened={setSlideOpened}
        setPhotoIndex={setPhotoIndex}
        setPhotos={setPhotos}
        setCardPageOpen={setCardPageOpen}
        setCardId={setCardId}
        isOpened={isPortfolioOpened}
        userInfo={me}
      />

      <CSSTransitionStatistikPage
        setStatistikClose={setStatistikOpened}
        userConfig={me}
        isStatisticOpened={isStatistikOpened}
      />

      <CssTransitionNewInnerCase
        setSlideOpened={setSlideOpened}
        setPhotoIndex={setPhotoIndex}
        setPhotos={setPhotos}
        userInfo={userInfo}
        card={userInfo.profile.cards.find((card) => card.id === cardId)}
        isOpened={isCardPageOpened}
      />


    </>
  );
};

export default BaidgeWithProfile;
