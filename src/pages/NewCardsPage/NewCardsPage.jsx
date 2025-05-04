import React, { useState } from "react";
import { CardsFilterEnum } from "./enums/CardsFilterEnum";
import { useSelector } from "react-redux";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import MyAnimation from "../MyAds/components/MyAnimation";
import CardsPageBody from "./CardsPageBody";

const NewCardsPage = ({
  userInfo,
  setCardId,
  setCardPageOpen,
  setPhotoIndex,
  setPhotos,
  setSlideOpened,
}) => {
  const [filter, setFilterBy] = useState(CardsFilterEnum.WATCHES);

  const postState = useSelector((state) => state.telegramUserInfo.postState);

  const putState = useSelector((state) => state.telegramUserInfo.putState);

  if (postState === "pending" || putState === "pending") {
    return <MyLoader />;
  }
  const cards = userInfo.profile.cards;

  return (
    <div className="pt-[16px] z-20 fixed left-0 top-0 w-screen h-screen overflow-y-auto px-[16px] bg-[#18222d] flex flex-col pb-[20px]">
      {!cards.length ? (
        <div className="h-screen flex justify-center items-center">
          <MyAnimation  height="100vh" text="Нет кейсов" />
        </div>
      ) : (
        <CardsPageBody
          cards={cards}
          setCardId={setCardId}
          setCardPageOpen={setCardPageOpen}
          setFilterBy={setFilterBy}
          setPhotoIndex={setPhotoIndex}
          setPhotos={setPhotos}
          setSlideOpened={setSlideOpened}

        />
      )}
    </div>
  );
};

export default NewCardsPage;
