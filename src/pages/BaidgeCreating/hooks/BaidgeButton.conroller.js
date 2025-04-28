import MainButton from "../../../constants/MainButton"
import { disableColorAndActiveButton } from "../../../functions/disableColorAndActiveButton"
import { enableColorAndActiveButton } from "../../../functions/enableColorAndActiveButton"
import { putUserInfo } from "../../../store/telegramUserInfo";

class BaidgeButtonController{
    mainButton = MainButton;
    controlVisability({errors, isCategoryOpen, isProfessionOpened, step}){
        const isNeededToEnableFirstPage = !errors.descriptionError
        const isNeededToEnableSecondPage = Object.values({taggsError : errors.taggsError, linksError : errors.linksError}).every((val) => !val)
        if (!isCategoryOpen && !isProfessionOpened){
            if (step === 0){
                if (isNeededToEnableFirstPage){
                    enableColorAndActiveButton()
                }
                else{
                    disableColorAndActiveButton();
                }
            }
            else{
                if (isNeededToEnableSecondPage){
                    enableColorAndActiveButton()
                }
                else{
                    disableColorAndActiveButton();
                }
            }
            
        }
    }

    forwardFunction({step, setStep, isCategoryOpen, isProfessionOpened, postBaidge}){
        return () => {
            if (!isCategoryOpen && !isProfessionOpened){
                if (step === 1){
                    postBaidge()
                }
                else{
                    setStep(1)
                }
            }
        }
    }
    backFunction({step, navigate, setStep, isCategoryOpen, isProfessionOpened}){
        return () => {
            if (!isCategoryOpen && !isProfessionOpened){
                if (step === 1){
                    setStep(0)
                }
                else{
                    navigate(-1);
                }
            } 
        }
    }
    controlText({step}){
        if (step === 0){
            this.mainButton.setText("ДАЛЕЕ")
        }
        else{
            this.mainButton.setText("Создать бэйдж")
        }
    }
}

export default new BaidgeButtonController();