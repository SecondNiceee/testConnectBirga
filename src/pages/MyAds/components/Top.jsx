import React from 'react';
import icon from '../../../images/icons/icon.svg'
import Burger from '../../../components/UI/Burger/Burger';
import { useSelector } from 'react-redux';
const Top = ({setMenuActive , name}) => {
    const userInfo = useSelector(state => state.telegramUserInfo)
    return (
        <div className="top">
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
            <p className="MyAds">{name}</p>
            <img className="topIcon" src={userInfo.photo} alt="" />

        </div>
    );
};

export default Top;