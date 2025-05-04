import { SecondatyButton } from "../../../constants/SecondaryButton";
import { deleteServerCard } from "../../../store/telegramUserInfo";

class SecondaryButtonController{
    secondaryButton = SecondatyButton;
    controllVisabiliry({isCardPageOpened}){
        if (isCardPageOpened){
            SecondatyButton.show()
            SecondatyButton.setText("Удалить")
            SecondatyButton.setParams({
                position : "left",
                color : "#462424",
                text_color : "#FF4646"
            })
        }
        else{
            SecondatyButton.hide();
        }
    }

    secondaryButtonHandler({dispatch, cardId,setCardPageOpen}){
        window.Telegram.WebApp.showPopup({
                  title: "Удалить?",
                  message: "Вы уверены, что хотите удалить этот кейс?",
                  buttons: [
                    { id: "save", type: "default", text: "Да" },
                    { id: "delete", type: "destructive", text: "Нет" },
                  ],
                } , async (buttonId) => {
            
                  if (buttonId === "delete" || buttonId === null) {
                    
                  } 
                  if (buttonId === "save") {
                    await dispatch(deleteServerCard(cardId))
                    setCardPageOpen(false);
                  }
                } )
        
    }
}

export const secondaryButtonController = new SecondaryButtonController();