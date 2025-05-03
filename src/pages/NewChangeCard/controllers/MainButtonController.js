import MainButton from "../../../constants/MainButton";
import { disableColorAndActiveButton } from "../../../functions/disableColorAndActiveButton";
import { enableColorAndActiveButton } from "../../../functions/enableColorAndActiveButton";
import { showAllert } from "../../../functions/showAlert";
import { putCard } from "../../../store/telegramUserInfo";
import { makeCardFormData } from "../utils/makeCardFormData";
import {isEqual} from "lodash";

class MainButtonController{
    mainButton = MainButton
    async forwardFunction({errors, dispatch, setCard, setChangingCardOpened, changedCard}){
        if (errors.links.isError){
            showAllert("Ваши некоторые ссылки невалидны")
        }
        else{
            const myFormData = makeCardFormData(changedCard);
            try {
                await dispatch(putCard([myFormData, changedCard.id, changedCard]));
                setCard(changedCard);
                setChangingCardOpened(false);
                } catch (error) {
                console.error('Ошибка при сохранении карточки:', error);
                showAllert("Ошибка сохранения кейса. Проверьте введенные данные, возможно они не валидны или слишком велики/слишком малы. (Много ссылок, много фоток)")
                }
        }
    }

    visabilityController({errors, card, changedCard, isChangingCardOpened}){
        if (isChangingCardOpened){
            if (!(Object.values({...errors, links : false }).every( (el) => !el)) || isEqual(card, changedCard)){
                disableColorAndActiveButton();
            }
            else{
                enableColorAndActiveButton();
            }
        }
    }

}

export const mainButtonController = new MainButtonController();