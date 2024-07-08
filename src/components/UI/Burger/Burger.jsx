import React, { memo } from 'react';
import classes from "./Burger.module.css"
const Burger = (props, style) => {
    return (
        <div {...props}className={classes.burgerMainWrapper}>

            <div  className= {classes.Burger}>
                <div  className="Burger__wrapper">

                </div>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default memo(Burger);