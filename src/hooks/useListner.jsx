import { useEffect } from "react";

const useListner = ({isMenuActive , setMenuActive , setDetailsActive , isDetailsActive , isOpen} ) => {
    return (  useEffect(() => {
        let startTouchX = 0;
        let endTouchX = 0;
        let startTouchY = 0;
        let endTouchY = 0;
        function listnerFunctionOne(e) {
          startTouchX = e.changedTouches[0].pageX;
          startTouchY = e.changedTouches[0].pageY;
        }
        
        function listnerFunctionTwo(e) {
          endTouchX = e.changedTouches[0].pageX;
          
          endTouchY = e.changedTouches[0].pageY;

          if (!isOpen){

              if (
                endTouchX - startTouchX > 100 &&
                Math.abs(startTouchY - endTouchY) < 150
                )
                if (isDetailsActive) {
                    setDetailsActive(false)
                }
                else{
                    setMenuActive(true);
                }
    
              if (isMenuActive) {
                if (
                  endTouchX - startTouchX < 100 &&
                  Math.abs(startTouchY - endTouchY) < 150
                ) {
                    if (isDetailsActive) {
                        setDetailsActive(false)
                    }
                    else{
                        setMenuActive(false);
                    }
                }
              }
          }

        }
        document.removeEventListener('touchstart' , listnerFunctionOne)
        document.removeEventListener('touchend' , listnerFunctionTwo)
        document.addEventListener("touchstart", listnerFunctionOne);
        document.addEventListener("touchend", listnerFunctionTwo);
    
        return () => {
          document.removeEventListener('touchstart' , listnerFunctionOne)
          document.removeEventListener('touchend' , listnerFunctionTwo)
        }
      }, [isMenuActive , isDetailsActive , isOpen , setDetailsActive , setMenuActive])   )    ;  ;
};

export default useListner;
