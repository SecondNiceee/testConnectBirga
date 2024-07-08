import { useEffect } from "react";
import BackButton from "../../constants/BackButton";
import MainButton from "../../constants/MainButton";

export const useButton = ({
  sliderActive,
  localDetails,
  localAboutReaction,
  localIsOpen,
  setOpen,
  setSecondPage,
  navigate,
  setOpenAboutReaction,
  setSliderActive,
  openAboutReaction,
  isOpen,
  localSecondPage,
  details,
  secondPage

}) => {
  useEffect(() => {
    function writeFucntion() {
      window.Telegram.WebApp.openTelegramLink(
        "https://t.me/" + isOpen.responce.user.link
      );
    }
    function goBack() {
      if (!sliderActive.isActive) {
        if (!localDetails.isActive) {
          if (!localAboutReaction.isActive) {
            if (localIsOpen.isActive) {
              setOpen({ ...isOpen, isActive: false });
            } else {
              if (localSecondPage.isActive) {
                setSecondPage({ ...secondPage, isActive: false });
              } else {
                navigate(-1);
              }
            }
          } else {
            setOpenAboutReaction({ ...openAboutReaction, isActive: false });
          }
        } else {
        }
      } else {
        setSliderActive({ ...sliderActive, isActive: false });
      }
    }
    if (!localSecondPage.isActive && !details.isActive) {
      BackButton.hide();
    } else {
      BackButton.show();
    }

    if (isOpen.isActive) {
      MainButton.show();
      MainButton.setParams({
        color: "#2ea5ff",
        text_color: "#ffffff",
      });
      MainButton.setText("Написать");
      MainButton.onClick(writeFucntion);
    } else {
      MainButton.hide();
      MainButton.offClick(writeFucntion);
    }
    BackButton.onClick(goBack);
    return () => {
      BackButton.offClick(goBack);
      MainButton.offClick(writeFucntion);
    };

    // eslint-disable-next-line
  }, [
    isOpen.isActive,
    sliderActive.isActive,
    openAboutReaction.isActive,
    sliderActive.isActive,
    details.isActive,
    isOpen,
    navigate,
  ]);
};

