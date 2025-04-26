import MainButton from "../../../constants/MainButton"
import { disableColorAndActiveButton } from "../../../functions/disableColorAndActiveButton"
import { enableColorAndActiveButton } from "../../../functions/enableColorAndActiveButton"

class BaidgeButtonController{
    mainButton = MainButton;
    controlVisability({errors}){
        if (!Object.values(errors).every((val) => !val)){
            disableColorAndActiveButton()
        }
        else{
            enableColorAndActiveButton()
        }
    }

    forwardFunction({step, setStep}){
        return () => {
            if (step === 1){
                alert("Создание бэфджа")
            }
            else{
                setStep(1)
            }
        }
    }
    backFunction({step, navigate, setStep}){
        return () => {
            if (step === 1){
                setStep(0)
            }
            else{
                navigate(-1);
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