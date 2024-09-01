import React from 'react';
import cl from "./CreateButton.module.scss"
const CreateButton = ({className , onClick, children}) => {
    return (
        <div onClick={onClick} className={className ? [cl.container, className].join(' ') : cl.container}>
            {children}
        </div>
    );
};

export default CreateButton;