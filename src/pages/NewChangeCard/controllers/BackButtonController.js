import {isEqual} from "lodash";
import { showAllert } from "../../../functions/showAlert";
import { putCard } from "../../../store/telegramUserInfo";
import { makeCardFormData } from "../utils/makeCardFormData";
export class BackButtonController{
    async backFunction({errors, changedCard, card, setChangingCardOpened, dispatch, setCard}){
        if (isEqual(changedCard, card)){
            setChangingCardOpened(false)
        }
        else{
            window.Telegram.WebApp.showPopup(
                {
                  title: "Сохранить?",
                  message: "Сохранить кейс перед выходом?",
                  buttons: [
                    { id: "save", type: "default", text: "Сохранить" },
                    { id: "delete", type: "destructive", text: "Нет" },
                  ],
                },
                async (buttonId) => {
                  if (buttonId === "save") {
                    if (Object.values({...errors, links : errors.links.isError}).every( (err) => !err ) ){
                        try{
                            const myFormData = makeCardFormData(changedCard);
                            await dispatch(putCard([myFormData, changedCard.id, changedCard]));
                            setCard(changedCard);
                            setChangingCardOpened(false);
                        }
                        catch(e){
                            showAllert("Ошибка сохранения кейса. Проверьте введенные данные, возможно они не валидны или слишком велики/слишком малы. (Много ссылок, много фоток)")
                        }
                    }
                    else{
                        if (errors.title){
                            showAllert("Заголовок должен быть от 3 до 25 символов")
                        }
                        else{
                            if (errors.description){
                                showAllert("Описание должно быть от 5 до 500 символов")
                            }
                            else{
                                if (errors.photos){
                                    showAllert("Фото работы обязательно. Но не более 5 фоток")
                                }
                                else{
                                    showAllert('Некоторые ваши ссылки невалидны')
                                }
                            }
                        }
                    }
                  }
                  if (buttonId === "delete" || buttonId === null) {
    
                  }
                }
              );
        }
    }
}

export const backButtonController = new BackButtonController();