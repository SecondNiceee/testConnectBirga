import React from 'react';
import cl from './Customer.module.css'
import MyButton from '../../UI/MyButton/MyButton';
const Customer = ({fl , photo, chatId}) => {
    return (
        <div className={cl.wrapper}>
            <img className={cl.userPhoto} src={photo} alt="" />
            <div className={cl.two}>
                <p>{fl}</p>
                <p>Заказчик</p>
            </div>
            <MyButton className = {cl.MyButton}>
                НАПИСАТЬ
            </MyButton>
        </div>
    );
};

export default Customer;