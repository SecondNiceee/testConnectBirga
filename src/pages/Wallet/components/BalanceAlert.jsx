import React from 'react';
import cl from "../index.module.scss"
const BalanceAlert = () => {
    return (
    <div className={ [cl.alertBlock, cl.latter].join(' ')}>
        <p>Баланс обновляется!</p>
        <p>
            После успешной транзакции, баланс может быть изменен вплоть до 10 минут
        </p>
      </div>
    );
};

export default BalanceAlert;