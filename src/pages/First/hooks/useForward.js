import { useCallback } from 'react';
import translation from '../../../functions/translate';

const useForward = ({isSliderOpened, isMyResponse, setSlideOpened, setStep, step}) => {
   const forward = useCallback( () => { // эта функция вызывается в момент , когда мы находимся в подробнее задания
        if (!isSliderOpened){
          if (isMyResponse) {
            window.Telegram.WebApp.showPopup({
              title: translation("Ошибка"),
              message:
                translation("Задание ваше или вы откликнулись уже на него."),
            });
          } else {
            if (step === 0){
                setStep(1)
            }
          }
        }
        else{
          setSlideOpened(false)
        }
    }, [isSliderOpened, isMyResponse, setSlideOpened, setStep, step] )
    
    return forward
};

export default useForward;