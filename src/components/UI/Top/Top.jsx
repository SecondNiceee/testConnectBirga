import React from 'react';
import Burger from '../Burger/Burger';
import { useSelector } from 'react-redux';
import cl from './Top.module.css'
const Top = ({setMenuActive , name , className, ...props}) => {
    const userInfo = useSelector(state => state.telegramUserInfo)
    return (
        <div {...props} className={className ? [cl.top , className].join(' ') : cl.top}>
            <Burger
                style = {
                    {
                        position : 'unset'
                    }
                }
                onClick={(e) => {
                setMenuActive(true);
                }}
            />
            <p className={cl.MyAds}>{name}</p>
            <img className={cl.topIcon} src={userInfo.photo} alt="" />

        </div>
    );
};

export default Top;