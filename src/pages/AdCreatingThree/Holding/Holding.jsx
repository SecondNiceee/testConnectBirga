import React from 'react';
import cl from './Holding.module.css'
const Holding = ({className, taskInformation }) => {
    return (
        <div className={className ? [className , cl.Holding].join(' ') : cl.Holding}>
            <Text>К ХОЛДУ</Text>
            <Text>{taskInformation.tonValue} <span className={cl.TON}>TON</span></Text>
            <Text>~ {taskInformation.budget} RUB</Text>
        </div>
    );
};

export default Holding;