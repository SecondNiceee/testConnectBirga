import React from 'react';
import cl from "./GreyButton.module.scss"
const GreyButton = ({className}) => {
    return (
        <div className={className ? [cl.container, className].join(' ') : cl.container}>
                <p>Очистить всё</p>
        </div>
    );
};

export default GreyButton;