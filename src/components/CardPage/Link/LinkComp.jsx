import React, { memo, useCallback, useMemo } from 'react';
import cl from './LinkComp.module.css'
import behanceIcon from "../../../images/icons/behance.svg";
import dripleIcon from "../../../images/icons/Dribble.svg";
import dropfileIcon from "../../../images/icons/Dropfile.svg";
import Text from '../../Text/Text';
const LinkComp = ({navigate, link}) => {
    const imageLink = useMemo( () => {
        switch (navigate){
            case "behance":
                return behanceIcon;

            case "driple":
                return dripleIcon;
            case "dropfile":
                return dropfileIcon
            default:
                window.Telegram.WebApp.showAlert("Что - то пошло не так")
        }
    } , [navigate] )
    const linkHandler = useCallback( (par) => {
        window.Telegram.WebApp
        .showPopup({
          title: "Перейти?",
          message: `Вы уверены, что хотите перейти по ссылке ${par}?`,
          buttons: [
            { id: "save", type: "default", text: "Да" },
            { id: "delete", type: "destructive", text: "Нет" },
          ],
        } , (buttonId) => {
    
          if (buttonId === "delete" || buttonId === null) {
            
          }
          if (buttonId === "save") {
            window.Telegram.WebApp.openLink(link)
          }
    
    
        } )
    } , [link] )

    
    return (
        <div  onClick={(par) => {
            linkHandler()
        }} className={cl.cardsLink}>
            <img src={imageLink} alt="" />
            <Text>{link}</Text>
        </div>
    );
};

export default memo(LinkComp);