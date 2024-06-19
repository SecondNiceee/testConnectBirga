import React, { useEffect } from 'react';
import cl from './ModalInput.module.css'
import TaskName from '../TaskName/TaskName';
const ModalInput = ( {setting , setModal, ...props} ) => {
    useEffect( () => {
        const wrap = document.getElementById('modalInput')
        wrap.querySelector('input').focus()
    } , [] )
    return (
        <div id = 'modalInput' className={cl.modalInput}>
            <div onTouchEnd={() => {
                setModal(false)
            }} onClick={() => {
                setModal(false)
            }} className={cl.blackArea}></div>
            <TaskName
            className={cl.modalTextName}
            text = {setting.text}
            title={''}
            setText={(e) => {
                setting.setText(e)
                setting.text = e
            }}
            placeholder={setting.placeholder}
             />
        </div>
    );
};

export default ModalInput;