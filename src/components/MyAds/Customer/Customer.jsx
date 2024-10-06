import React from 'react';
import cl from './Customer.module.css'
import MyButton from '../../UI/MyButton/MyButton';
import userPhoto from "../../../images/userPhoto/user.png"
import Text from '../../Text/Text';
const Customer = ({fl , photo, link, onImageClick}) => {
    return (
        <div className={cl.wrapper}>
            <img style={{
                objectFit : "cover"
            }} onClick={onImageClick}  className={cl.userPhoto} src={photo.length > 0 ? photo.split('https://').length === 2 ? photo : `${process.env.REACT_APP_HOST}/${id}/${photo}` : userPhoto} alt="" />
            <div onClick={onImageClick} className={cl.two}>
                <Text>{fl}</Text>
                <Text>Заказчик</Text>
            </div>
            <MyButton hard = {true} onClick = {() => {
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