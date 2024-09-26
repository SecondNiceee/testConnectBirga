import React, { useCallback, useEffect } from 'react';
import cl from "./HappyHold.module.scss";
import { useLottie } from "lottie-react";
import chemodan from "../../animation/boomstick.json"
import { useSelector } from 'react-redux';
import MainButton from '../../constants/MainButton';
import translation from '../../functions/translate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const HappyPage = ({task , congradulate }) => {
    const user = useSelector( state => state.telegramUserInfo )
    const navigate = useNavigate()
    console.log(user);

    console.warn(congradulate);
    

    useEffect( () => {
        async function start(  ) {
            try{

                const user = await axios.patch("https://www.connectbirga.ru/user", {},  {
                    params: {
                      congratulateId : congradulate[0].id ,
                      userId: window.Telegram.WebApp.initDataUnsafe.user.id,
                    },
                    headers : {
                      "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                    }
                  });
            }
            catch(e){
                alert(e)
                console.warn(e)
            }

        }
        start()
    } , [] )
    
    useEffect( () => {
        const menu = document.querySelector('.FirstMenu')
        menu.style.display = "none"
        return () => {

            menu.style.display = "flex"
        }

    } , [] )

    const buttonFunction = useCallback( () => {
        navigate("/Wallet")
    } , [] )

    useEffect( () => {
        MainButton.show()
        MainButton.onClick(buttonFunction)
        MainButton.setText(translation("КОШЕЛЕК"))
        
        return () => {
            MainButton.offClick(buttonFunction)
            MainButton.hide()
        }
    } , [buttonFunction ] )

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
                <h2>Вы выполнили задание «{task.title}»</h2>
            </div>
            <p className={cl.bottomBlock}>
                <span>{task.price} TON </span>  были отправлены на ваш Коннект Кошелек 
            </p>
        </div>
    );
};

export default HappyPage;