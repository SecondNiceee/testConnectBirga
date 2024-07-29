import React, { useCallback } from 'react';
import classes from "./Burger.module.css"
import { useDispatch } from 'react-redux';
import { changeMenuActive } from '../../../store/menuSlice';
const Burger = (props, style) => {
    const dispatch = useDispatch()
    const setMenuActive = useCallback(
        (set) => {
          dispatch(changeMenuActive(set));
        },
        [dispatch]
      );
    return (
        <div onClick={() => {
            const menu = document.documentElement.querySelector(".FirstMenu");
            menu.style.transition = "0.4s";
            menu.style.transform = "translateX(0px)";
            menu.style.left = "0px";
            setMenuActive(true);
        }} className={classes.burgerMainWrapper}>

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

export default Burger;