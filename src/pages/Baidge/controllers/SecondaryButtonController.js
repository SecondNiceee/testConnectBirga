import { SecondatyButton } from "../../../constants/SecondaryButton";
import { deleteCard, deleteServerCard } from "../../../store/telegramUserInfo";

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

    secondaryButtonHandler({dispatch, cardId}){
        dispatch(deleteServerCard(cardId))
    }
}

export const secondaryButtonController = new SecondaryButtonController();