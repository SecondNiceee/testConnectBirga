import MainButton from "../../../constants/MainButton"

export class MainButtonController{
    mainButton = MainButton;
    controlVisability({isCardPageOpened, isChangingCardOpened, myId, userInfoId}){
        if (isChangingCardOpened){
            this.mainButton.show()
            this.mainButton.setText("СОХРАНТЬ")
            return;
        }
        if (isCardPageOpened && (userInfoId === myId)){
            this.mainButton.show();
            this.mainButton.setText('ИЗМЕНИТЬ')
            return ;
        }
        this.mainButton.hide();
    }

    fowardFunction({isChangingCardOpened, isCardPageOpened, setChangingCardOpened, myId, userInfoId }){
        if (isChangingCardOpened){
            return;
        }
        if (isCardPageOpened && (userInfoId === myId)){
            setChangingCardOpened(true)
        }
    }
}

export const mainButtonController = new MainButtonController();