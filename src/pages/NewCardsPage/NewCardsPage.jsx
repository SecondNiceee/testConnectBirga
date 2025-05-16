import React, { useCallback, useEffect, useState } from "react";
import { CardsFilterEnum } from "./enums/CardsFilterEnum";
import { useSelector } from "react-redux";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import MyAnimation from "../MyAds/components/MyAnimation";
import CardsPageBody from "./CardsPageBody";
import useSlider from "../../hooks/useSlider";
import CssTransitionSlider from "../../components/UI/PhotosSlider/CssTransitionSlider";
import menuController from "../../functions/menuController";
import { useNavigate } from "react-router";
import MainButton from "../../constants/MainButton";
import useNavigateBack from "../../hooks/useNavigateBack";

const NewCardsPage = () => {

  const [filter, setFilterBy] = useState(CardsFilterEnum.WATCHES);

  const postState = useSelector((state) => state.telegramUserInfo.postState);

  const putState = useSelector((state) => state.telegramUserInfo.putState);

  const userInfo = useSelector( (state) => state.information.baidgeUser );

  const me = useSelector( (state) => state.telegramUserInfo )


  const navigate = useNavigate();

  const createCard = useCallback( () => {
    navigate('/cardCreation')
  },[navigate] )

  const BackFunction = useCallback( () => {
    navigate('/baidge')
  }, [navigate] )

  useEffect( () => {
    if (userInfo.id === me.id){
      MainButton.show();
      MainButton.setText("Создать")
      MainButton.onClick(createCard);
    }
    else{
      MainButton.show();
      MainButton.setText("Hазад");
      MainButton.onClick(BackFunction)
    }
  }, [createCard, BackFunction, me, userInfo] )

  useNavigateBack({isSliderOpened : false, setSlideOpened : false});
  useEffect( () => {
    menuController.hideMenu();
  }, [] )
  
  const {isSliderOpened, photoIndex, photos, setPhotoIndex, setPhotos, setSlideOpened} = useSlider();

  if (postState === "pending" || putState === "pending" || !userInfo) {
    return <MyLoader />;
    
  }
  const cards = userInfo.profile.cards;

  return (
    <>

    <div className="pt-[16px] z-20 fixed left-0 top-0 w-screen h-screen overflow-y-auto px-[16px] bg-[#18222d] flex flex-col pb-[20px]">
      {!cards.length ? (
        <div className="h-screen flex justify-center items-center">
          <MyAnimation  height="100vh" text="Нет кейсов" />
        </div>
      ) : (
        <CardsPageBody
          cards={cards}
          setFilterBy={setFilterBy}
          setPhotoIndex={setPhotoIndex}
          setPhotos={setPhotos}
          setSlideOpened={setSlideOpened}
        />
      )}
    </div>
      <CssTransitionSlider
        blockerAll={true}
        blockerId={""}
        isSliderOpened={isSliderOpened}
        leftPosition={0}
        renderMap={photos}
        setSliderOpened={setSlideOpened}
        sliderIndex={photoIndex}
        swiperId={"1"}
        top={0}
      />
     </>
  );
};

export default NewCardsPage;
