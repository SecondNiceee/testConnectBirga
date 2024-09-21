import React from 'react';
import cl from "../index.module.scss"
const BalanceAlert = () => {
    return (
    <div className={ [cl.alertBlock, cl.latter].join(' ')}>
        <p>Баланс обновляется!</p>
        <p>
            После транзакций баланс может изменяеться в течении 5-10 минут.
        </p>
      </div>
    );
};

export default BalanceAlert;