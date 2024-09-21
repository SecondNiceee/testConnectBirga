import React, { useEffect } from 'react';
import cl from "./HappyHold.module.scss";
import { useLottie } from "lottie-react";
import chemodan from "../../animation/boomstick.json"
import { useSelector } from 'react-redux';
const HappyPage = () => {
    const user = useSelector( state => state.telegramUserInfo )
    console.log(user);
    
    useEffect( () => {
        const menu = document.querySelector('.FirstMenu')
        menu.style.display = "none"
        return () => {
            menu.style.display = "flex"
        }

    } , [] )

    const options = {
        animationData: chemodan,
        loop: true,
        style: {
          display: "flex",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100px",
          marginBottom : "10px"
        },
      };

    const { View } = useLottie(options);
    return (
        <div className={cl.container}>
            <div className={cl.up}>
                {View}
                <h3>Поздравляем!</h3>
                {/* <h2>Ваше задание принятно в работу исполнителем {response.user.fl}</h2> */}
                <h2>Вы выполнили задание какое-то там</h2>
            </div>
            <p className={cl.bottomBlock}>
                <span>0.1 TON</span>  были отправлены на ваш Коннект Кошелек 
            </p>
        </div>
    );
};

export default HappyPage;