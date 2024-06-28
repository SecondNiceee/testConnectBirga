import React from 'react';
import cl from "./ChoicerModal.module.css"
import Component from '../Component/Component';
const ChoicerModal = ({arr , setOpen, className}) => {
    return (

        <div  className={className ? [cl.main , className].join(' ') : className}>
        <div className= {cl.choicerWrapper} onClick={(e) => {
            setOpen(false)
        }} >

                </div>
            <div id = "modal" className={cl.ChoicerModal}>
                {arr.map((e, i) => {
                    return (
                        <Component  key = {i} className={cl.component}>
                            <p>{e}</p>
                        </Component>
                    )
                })}
            </div>

        </div>

    );
};

export default ChoicerModal;