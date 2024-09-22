import React from 'react';
import cl from "../index.module.scss"
import Text from '../../../components/Text/Text';
const StageThree = () => {
    return (
        <div className={cl.stage}>
        <div className={cl.circle}>
            <p className={cl.circleText}>3</p>
        </div>
        <Text>
            Вставьте скопированный адрес выше и нажмите CONTINUE. Подтвердите
            транзакцию.
        </Text>
    </div>
    );
};

export default StageThree;