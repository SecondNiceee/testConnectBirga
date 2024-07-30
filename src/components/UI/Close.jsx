import React, { useCallback } from 'react';
import { changeMenuActive } from '../../store/menuSlice';
import { useDispatch } from 'react-redux';


const Close = ({isMenuActive , setMenuActive}) => {
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