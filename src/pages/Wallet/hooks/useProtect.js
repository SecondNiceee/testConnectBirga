import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useProtect = () => {
    const address = useSelector( state => state.telegramUserInfo.address )
    const navigate = useNavigate()
    useEffect( () => {
        if (!address){
            navigate("/CreateWallet")
        }
    } , [] )
};

export default useProtect