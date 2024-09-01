import React from 'react';
import cl from "./PayBlock.module.scss"
import CreateButton from '../CreateButton/CreateButton';
const PayBlock = ({className}) => {
    return (
        <div className={className ? [cl.container, className].join(' ') : className}>
            <CreateButton className={cl.createButton} >
                <p>Создать кошелек</p>
                </CreateButton>
            <div className={cl.textContainer}>
                <p>
                    Что такое <span>кошелек</span> и для чего он нужен? 
                </p>
                <p>Уже есть кошелек? <span>Войти</span></p>
            </div>
        </div>
    );
};

export default PayBlock;