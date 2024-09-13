import React, { memo, useCallback, useState } from 'react';
import GreyText from '../../../components/UI/GreyText/GreyText';
import cl from "../index.module.scss"
import WithdrawalCap from './WithdrawalCap';
import CreateInput from '../../../components/UI/CreateInput/CreateInput';
const WithdrawalPage = () => {
    const [myValues, setMyValues] = useState({
        address : "",
        summ : 0
    })
    const valuesChanger = useCallback((e) => {
        setMyValues( (value) => ({...value, summ : e}) )
    } , [])
    return (
        <div className={cl.withDrawal}>
            <WithdrawalCap />
            

            <div className={cl.adressBlock}>

                <GreyText className={cl.GreyText} >
                    Адрес
                </GreyText>

                <CreateInput placeholder = {"Введите адрес кошелька"} setValue={valuesChanger} />

            </div>

            <div className={cl.informationBlock}>
                <p>Убедитесь, что вы выводите свои токены на правильный адрес и в правильную сеть (TON)</p>
            </div>
        </div>
    );
};

export default memo(WithdrawalPage);