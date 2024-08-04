import React from 'react';
import cl from './Customer.module.css'
import MyButton from '../../UI/MyButton/MyButton';
import userPhoto from "../../../images/userPhoto/user.png"
const Customer = ({fl , photo, link, onImageClick}) => {
    return (
        <div className={cl.wrapper}>
            <img style={{
                objectFit : "cover"
            }} onClick={onImageClick}  className={cl.userPhoto} src={photo.length > 0 ? photo : userPhoto} alt="" />
            <div onClick={onImageClick} className={cl.two}>
                <p>{fl}</p>
                <p>Заказчик</p>
            </div>
            <MyButton onClick = {() => {
                      window.Telegram.WebApp.openTelegramLink(
                        "https://t.me/" + link
                      );
              }}  style = {{marginLeft : "auto"}}>
                НАПИСАТЬ
            </MyButton>
        </div>
    );
};

export default Customer;