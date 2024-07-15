import React from 'react';
import classes from  "./MyButton.module.css"
const MyButton = (props , className) => {
    return (
        <button className={ className ? [classes.MyButton, className].join(' ') : classes.MyButton } {...props}>{props.children}</button>
    );
};

export default MyButton;