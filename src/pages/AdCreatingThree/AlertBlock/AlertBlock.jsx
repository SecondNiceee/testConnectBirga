import React, { useMemo } from 'react';
import cl from "./AlertBlock.module.scss"
const AlertBlock = ({address, tonValue}) => {
    const text = useMemo( () => {
        if (!address){
            return `Для выбора исполнителя необходимо создать Коннект Кошелёк (бесплатно) и пополнить его на стоимость заказа (${tonValue} TON)`
        }
        return "На вашем кошельке отсутствует сумма, необходимая для выбора исполнителя. Пополните кошелёк и попробуйте снова!"
    }  , [address, tonValue])
    return (
        <div className={cl.container}>
            <h4>Обратите внимание!</h4>
            <p>{text}</p>
        </div>
    );
};

export default AlertBlock;