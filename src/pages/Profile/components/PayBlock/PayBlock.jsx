import React, { memo, useCallback } from 'react';
import cl from "./PayBlock.module.scss"
import CreateButton from '../CreateButton/CreateButton';
import PayTextContainer from '../PayTextContainer/PayTextContainer';
import { useNavigate } from 'react-router-dom';
const PayBlock = ({className}) => {
    const navigate = useNavigate()
    const clickHandler = useCallback( () => {
        navigate("/createWallet")
    }, [])
    return (
        <div className={className ? [cl.container, className].join(' ') : className}>
            <CreateButton onClick={clickHandler} className={cl.createButton} >
                <p>Создать кошелек</p>
            </CreateButton>

            <PayTextContainer />

        </div>
    );
};

export default memo(PayBlock);