import React, { useCallback } from 'react';
import { changeMenuActive } from '../../store/menuSlice';
import { useDispatch } from 'react-redux';


const Close = ({isMenuActive }) => {
    const dispatch = useDispatch()
    const setMenuActive = useCallback(
        (set) => {

            const menu = document.documentElement.querySelector(".FirstMenu");
            menu.style.transition = "0.4s";
            menu.style.transform = "translateX(0px)";
            menu.style.left = "-301px";
          dispatch(changeMenuActive(set));

        },
        [dispatch]
      );
    return (
        
            <div  onClick = {() => { setMenuActive(false)}  } className='close' >
                <div className="close__wrapper" >

                </div>
                <div className="close__container" style={{position : 'relative'}}>
                    <span></span>
                    <span></span>
                </div>
            </div>
    );
};

export default Close;