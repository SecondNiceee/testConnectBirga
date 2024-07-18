import React, { useCallback } from 'react';

const Status = ({isActive , text}) => {
    const clickHandler = () => {
        window.Telegram.WebApp.showAlert(text)
    }
    return ( 
        <div onClick={clickHandler} className='StatusContainer'>
            <p>Статус</p>
            {isActive ? 
                <p className='TrueActive'>Активен</p>
                :
                <p className='FalseActive'>Не активен</p>
            }
            <p>См.больше</p>
        </div>
    );
};

export default Status;