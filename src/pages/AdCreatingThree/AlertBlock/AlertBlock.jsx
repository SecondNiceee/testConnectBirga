import React, { useMemo } from 'react';
import cl from "./AlertBlock.module.scss"
const AlertBlock = ({address}) => {
    const text = useMemo( () => {
        if (!address){
            return "Вам нужно создать кошелек(это бесплатно), чтобы продолжить."
        }
        return "На вашем кошельке отсутствует сумма, необходимая для выбора исполнителя. Пополните кошелёк и попробуйте снова!"
    }  , [address])
    return (
        <div className={cl.container}>
            <h4>Обратите внимание!</h4>
            <p>{text}</p>
        </div>
    );
};

export default AlertBlock;