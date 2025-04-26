import MainButton from "../../../constants/MainButton"
import { disableColorAndActiveButton } from "../../../functions/disableColorAndActiveButton"
import { enableColorAndActiveButton } from "../../../functions/enableColorAndActiveButton"

class BaidgeButtonController{
    mainButton = MainButton;
    controlVisability({errors, isCategoryOpen, isProfessionOpened}){
        const isNeededToEnable = Object.values(errors).every((val) => !val)
        if (!isCategoryOpen && !isProfessionOpened){
            if (isNeededToEnable){
                enableColorAndActiveButton()
            }
            else{
                disableColorAndActiveButton()
            }
        }
    }

    forwardFunction({step, setStep, isCategoryOpen, isProfessionOpened}){
        return () => {
            if (!isCategoryOpen && !isProfessionOpened){
                if (step === 1){
                    alert("Создание бэфджа")
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