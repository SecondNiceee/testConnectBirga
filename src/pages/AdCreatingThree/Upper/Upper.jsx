import React, { memo } from 'react';
import cl from './Upper.module.scss'
import translation from '../../../functions/translate';
const Upper = () => {
    const watchFunction = () => {
        alert("Куда-то там переход")
    }
    return (
        <div className={cl.container}>
            <h3>{translation("Холдирование")}</h3>
            <p>{translation(" Перед выбором исполнителя необходимо захолдировать токены ")}</p>
            <p>{translation("Подробнее")} <span>{translation("см.здесь")}</span></p>
        </div>
    );
};

export default memo(Upper);