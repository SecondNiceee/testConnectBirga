import {  useEffect } from "react";
import BackButton from "../../constants/BackButton";
import MainButton from "../../constants/MainButton";
import { useLocation } from "react-router-dom";

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
  secondPage,
  save

}) => {
  const history = useLocation()
  console.log(history)
  useEffect(() => {
    function writeFucntion() {
      
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
                // if (history[history.length - 1] === '/AdCreating'){

                //   navigate();
                // }
                // else{
                //   navigate(-1)
                // }
                navigate('/First')
              }
            }
          } else {
            setOpenAboutReaction({ ...openAboutReaction, isActive: false });
          }
        } else {
            save()
        }
      } else {
        setSliderActive({ ...sliderActive, isActive: false });
      }
    }

    BackButton.show();
    

    if (isOpen.isActive) {
      MainButton.show();
      MainButton.setParams({
        color: "#2ea5ff",
        text_color: "#ffffff",
      });
      MainButton.setText("ВЫБРАТЬ");
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
    save
  ]);
};

