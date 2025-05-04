import MainButton from "../../../constants/MainButton"
import { enableColorAndActiveButton } from "../../../functions/enableColorAndActiveButton";

export class MainButtonController{
    mainButton = MainButton;
    controlVisability({isCardPageOpened, isPortfolioOpened, isChangingCardOpened, myId, userInfoId, isSliderOpened}){
        if(isSliderOpened){
            this.mainButton.show();
            enableColorAndActiveButton();
            return;
        }
        if (isCardPageOpened && (userInfoId === myId)){
            this.mainButton.show();
            this.mainButton.setText('ИЗМЕНИТЬ')
            return ;
        }
        if (isPortfolioOpened && myId === userInfoId){
            this.mainButton.show()
            this.mainButton.setText("СОЗДАТЬ")
            enableColorAndActiveButton();
            return;
        }
        if (isChangingCardOpened){
            this.mainButton.show()
            this.mainButton.setText("СОХРАНТЬ")
            return;
        }

        this.mainButton.hide();
    }

    fowardFunction({isChangingCardOpened, isPortfolioOpened, isCardPageOpened, setChangingCardOpened, myId, userInfoId, isSliderOpened }){
        if (isSliderOpened){
            return;
        }
        if (isChangingCardOpened){
            return;
        }
        if (isCardPageOpened && (userInfoId === myId)){
            setChangingCardOpened(true)
        }
        if (isPortfolioOpened){
            setChangingCardOpened(true);
        }
    }
}

export const mainButtonController = new MainButtonController();