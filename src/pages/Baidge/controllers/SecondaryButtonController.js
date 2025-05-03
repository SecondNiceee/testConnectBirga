import { SecondatyButton } from "../../../constants/SecondaryButton";

class SecondaryButtonController{
    secondaryButton = SecondatyButton;
    controllVisabiliry({isCardPageOpened}){
        if (isCardPageOpened){
            SecondatyButton.show()
            SecondatyButton.setParams({
                position : "left"
            })
        }
        else{
            SecondatyButton.hide();
        }
    }
}

export const secondaryButtonController = new SecondaryButtonController();