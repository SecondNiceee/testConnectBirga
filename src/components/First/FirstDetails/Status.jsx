import React from 'react';

const Status = (isActive) => {
    return (
        <div className='StatusContainer'>
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