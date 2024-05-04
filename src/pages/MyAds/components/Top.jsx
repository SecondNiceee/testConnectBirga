import React from 'react';
import icon from '../../../images/icons/icon.svg'
import Burger from '../../../components/UI/Burger/Burger';
const Top = ({setMenuActive , name}) => {
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
            <img className="topIcon" src={icon} alt="" />

        </div>
    );
};

export default Top;