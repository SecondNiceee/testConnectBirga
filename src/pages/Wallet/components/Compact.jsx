import React, { memo } from 'react';
import cl from "../index.module.scss"
import GreyText from '../../../components/UI/GreyText/GreyText';
import CreateInput from '../../../components/UI/CreateInput/CreateInput';
const Compact = ({greyText, onChange, inputType, inputValue, inputPlaceholder, className = ""}) => {
    return (
        <div className={[className, cl.adressBlock].join(' ')}>
                            <GreyText className={cl.GreyText} >
                    {greyText}
                </GreyText>

                <CreateInput type={inputType} value={inputValue}  placeholder = {inputPlaceholder} setValue={onChange} />
        </div>
    );
};

export default memo(Compact);