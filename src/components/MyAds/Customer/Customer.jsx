import React from 'react';
import cl from './Customer.module.css'
import MyButton from '../../UI/MyButton/MyButton';
const Customer = ({fl , photo, link, onImageClick}) => {
    return (
        <div className={cl.wrapper}>
            <img onClick={onImageClick}  className={cl.userPhoto} src={photo} alt="" />
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