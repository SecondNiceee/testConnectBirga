import React, { memo } from 'react';
import cl from './Upper.module.scss'
const Upper = () => {
    const watchFunction = () => {
        alert("Куда-то там переход")
    }
    return (
        <div className={cl.container}>
            <h3>Холдирование</h3>
            <p>Перед выбором исполнителя 
            необходимо захолдировать токены </p>
            <p>Подробнее <span>см.здесь</span></p>
        </div>
    );
};

export default memo(Upper);