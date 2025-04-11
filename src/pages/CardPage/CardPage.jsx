import React, { memo, useEffect, useMemo } from "react";
import cl from "./CardPage.module.css";
import InnerCase from "../../components/CardPage/InnerCase/InnerCase";
import FullDescription from "../../components/First/FirstDetails/FullDescription";
import LinkComp from "../../components/CardPage/Link/LinkComp";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import translation from "../../functions/translate";
import useSlider from "../../hooks/useSlider";
import CssTransitionSlider from "../../components/UI/PhotosSlider/CssTransitionSlider";
const menu = document.documentElement.querySelector(".FirstMenu");
const CardPage = ({ card, ...props }) => {
  window.Telegram.WebApp.disableVerticalSwipes();

  useEffect(() => {
    const input = document.querySelectorAll("input");
    const textarea = document.querySelectorAll("textarea");
    for (let smallInput of input) {
      smallInput.addEventListener("focus", () => {
        menu.style.display = "none"; // скрываем меню
      });
      smallInput.addEventListener("blur", () => {
        menu.style.display = "flex"; // скрываем меню
      });
    }
    for (let smallTextarea of textarea) {
      smallTextarea.addEventListener("focus", () => {
        menu.style.display = "none"; // скрываем меню
      });
      smallTextarea.addEventListener("blur", () => {
        menu.style.display = "flex"; // скрываем меню
      });
    }
  }, []);

  const linksComponents = useMemo(() => {
    return (
      <div className={cl.cardsLinks}>
        {card.behanceLink.length > 0 ? (
          <LinkComp
            navigate={"behance"}
            link={card.behanceLink}
            name={translation("Ссылка на Behance")}
          />
        ) : (
          <></>
        )}

        {card.dribbbleLink.length > 0 ? (
          <LinkComp
            navigate={"driple"}
            link={card.dribbbleLink}
            name={translation("Ссылка на Dribbble")}
          />
        ) : (
          <></>
        )}

        {card.dropfileLink.length > 0 ? (
          <LinkComp
            navigate={"dropfile"}
            link={card.dropfileLink}
            name={translation("Ccылка на Dropfile")}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }, [card.dropfileLink, card.behanceLink, card.dribbbleLink]);

  const {
    isSliderOpened,
    photoIndex,
    photos,
    setPhotoIndex,
    setPhotos,
    setSlideOpened,
  } = useSlider();

  return (
    <>
      {card.id === 0 ? (
        <MyLoader
          style={{
            transform: "translateX(-32px)",
          }}
        />
      ) : (
        <div {...props} className={cl.wrapper}>
          <InnerCase
            setPhotoIndex = {setPhotoIndex}
            setPhotos = {setPhotos}
            setSliderOpened = {setSlideOpened}
            task={card}
            title={card.title}
            description={card.description}
            photos={card.photos}
          />
          <FullDescription
            style={{
              marginTop: "8px",
            }}
            fullDescription={card.description}
          />
          {card.dropfileLink.length > 0}
          {linksComponents}
        </div>
      )}
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

export default memo(CardPage);
