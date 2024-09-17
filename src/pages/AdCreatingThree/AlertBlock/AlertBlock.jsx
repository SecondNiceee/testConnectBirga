import React from 'react';
import cl from "./AlertBlock.module.scss"
const AlertBlock = () => {
    return (
        <div className={cl.container}>
            <h4>Обратите внимание!</h4>
            <p>На вашем кошельке отсутствует сумма, необходимая для выбора исполнителя. Пополните кошелёк и попробуйте снова!</p>
        </div>
    );
};

export default AlertBlock;