import React, { useCallback, useEffect, useState } from "react";

import AboutTop from "./AboutTop";
import AboutInfo from "./AboutInfo";
import AboutMain from "./AboutMain";
import ExampleWorks from "./ExampleWorks";
import { memo } from "react";
import axios from "axios";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";
import Stage from "../../../components/UI/Stage/Stage";
import Compact from "../../../components/UI/Compact/Compact";
import makeNewFile from "../../../functions/newMakeFile";
import MainButton from "../../../constants/MainButton";
import CssTransitionSlider from "../../../components/UI/PhotosSlider/CssTransitionSlider";
import useSlider from "../../../hooks/useSlider";

const AboutReaction = ({
  responce,
  setOneCard,
  style,
  isTelesgramVisible,
  isMyAds,
  isFirst,
  ...props
}) => {
  const [cards, setCards] = useState(null);
  useEffect(() => {
    async function getAllCards() {
      let localCards = [];
      try {
        let allCards = await axios.get(
          "https://www.connectbirga.ru/card/findByUser",
          {
            params: {
              userId: responce.user.id,
            },
            headers: {
              "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
            },
          }
        );

        for (let e of allCards.data) {
          let files = await makeNewFile(e.folder, e.photos);
          localCards.push({
            id: e.id,
            title: e.title,
            description: e.description,
            behanceLink: e.behance,
            dribbbleLink: e.dribble,
            dropfileLink: e.dropFile,
            photosNames: e.photos,
            photos: files,
          });
        }

        return localCards;
      } catch (e) {
        window.Telegram.WebApp.showAlert(e);
        console.log(e);
      }
    }
    getAllCards().then((value) => {
      setCards(value);
    });
    // eslint-disable-next-line
  }, []);

  const openFunc = useCallback(
    (par) => {
      setOneCard({ isOpen: true, card: par });
    },
    [setOneCard]
  );

  const {
    isSliderOpened,
    photoIndex,
    photos,
    setPhotoIndex,
    setPhotos,
    setSlideOpened,
  } = useSlider();

  console.log("Тут тут")

  return (
    <>
      <div
        style={
          MainButton.isVisible
            ? { ...style, paddingBottom: "74px" }
            : { ...style, paddingBottom: "97px" }
        }
        className="aboutReaction"
        {...props}
      >
        <AboutTop responce={responce} />

        <AboutInfo
          isTelesgramVisible={isTelesgramVisible}
          responce={responce}
        />

        <AboutMain aboutU={responce.user.about} />

        <Compact className={"stage-compact"} title={"Стаж работы"}>
          <Stage numberB={responce.user.stage} />
        </Compact>

        {cards === null ? (
          <MyLoader
            style={{
              transform: "translateX(-8px)",
              minHeight: "150px",
            }}
          />
        ) : (
          <ExampleWorks
            setPhotos = {setPhotos}
            setSliderOpened = {setSlideOpened}
            setPhotoIndex = {setPhotoIndex}
            userId={responce.user.id}
            openFunc={openFunc}
            cards={cards}
          />
        )}
      </div>

      <CssTransitionSlider
        blockerAll={true}
        blockerId={""}
        isSliderOpened={isSliderOpened}
        leftPosition={isFirst ? "100vw" : 0}
        renderMap={photos}
        setSliderOpened={setSlideOpened}
        sliderIndex={photoIndex}
        swiperId={"1"}
        top={0}
      />
    </>
  );
};
export default memo(AboutReaction);
