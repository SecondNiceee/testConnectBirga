import { useEffect } from "react";

const useListner = ({
  isMenuActive,
  setMenuActive,
  setDetailsActive,
  isDetailsActive,
  isOpen,
}) => {
  return useEffect(() => {
    const menu = document.documentElement.querySelector(".FirstMenu");
    let startTouchX = 0;
    let endTouchX = 0;
    let startTouchY = 0;
    let endTouchY = 0;
    function listnerFunctionOne(e) {
      menu.style.transition = "0s";
      startTouchX = e.changedTouches[0].pageX;
      startTouchY = e.changedTouches[0].pageY;
    }

    function moveHandler(e) {
      console.log(
        "translateX(" + (-e.changedTouches[0].pageY + startTouchY) + "px)"
      );
      if (!isMenuActive){

        if (e.changedTouches[0].pageX - startTouchX > 0 && e.changedTouches[0].pageX - startTouchX < 301)
        menu.style.transform =
          "translateX(" + (e.changedTouches[0].pageX - startTouchX) + "px)";
      }
      else{
        if (e.changedTouches[0].pageX - startTouchX < 0 && e.changedTouches[0].pageX - startTouchX > -301)
          menu.style.transform =
            "translateX(" + (e.changedTouches[0].pageX - startTouchX) + "px)";
      }
      
    
    }

    function listnerFunctionTwo(e) {
      endTouchX = e.changedTouches[0].pageX;

      endTouchY = e.changedTouches[0].pageY;

      if (!isOpen) {
        if (endTouchX - startTouchX > 150) {
          menu.style.transition = "0.4s";
          menu.style.transform = "translateX(0px)";
          menu.style.left = "0px";
          setMenuActive(true);
        } 
        else{
          menu.style.transition = "0.4s";
          menu.style.transform = "translateX(0px)";
        }

        if (isMenuActive) {
          if (endTouchX - startTouchX < 150) {

            menu.style.transition = "0.4s";
            menu.style.transform = "translateX(0px)";
            menu.style.left = "-301px";
            setMenuActive(false);
          }
          else{
            menu.style.transition = "0.4s";
            menu.style.transform = "translateX(0px)";
          }
        }
      }
    }
    document.removeEventListener("touchstart", listnerFunctionOne);
    document.removeEventListener("touchend", listnerFunctionTwo);
    document.removeEventListener("touchmove", moveHandler);
    document.addEventListener("touchstart", listnerFunctionOne);
    document.addEventListener("touchmove", moveHandler);
    document.addEventListener("touchend", listnerFunctionTwo);

    return () => {
      document.removeEventListener("touchmove", moveHandler);
      document.removeEventListener("touchstart", listnerFunctionOne);
      document.removeEventListener("touchend", listnerFunctionTwo);
    };
  }, [isMenuActive, isDetailsActive, isOpen, setDetailsActive, setMenuActive]);
};

export default useListner;
