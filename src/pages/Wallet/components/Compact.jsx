import React, { memo, useEffect, useMemo, useRef } from 'react';
import cl from "../index.module.scss"
import GreyText from '../../../components/UI/GreyText/GreyText';
import CreateInput from '../../../components/UI/CreateInput/CreateInput';
import { color } from 'framer-motion';
const Compact = ({greyText, onChange, inputType = "text", inputMode = "text", inputMistake = false, isGreyRed = false, inputValue, inputPlaceholder, className = ""}) => {

    return (
        <div className={[className, cl.adressBlock].join(' ')}>
                <GreyText style = {isGreyRed && inputMistake ? {color : "#fe6766"} : {}} className={cl.GreyText} >
                    {greyText}
                </GreyText>

                <div className={cl.createWrapper}>
                    <CreateInput mistake = {inputMistake}   className = {cl.newPadding}  inputMode={inputMode} type={inputType} value={inputValue}  placeholder = {inputPlaceholder} setValue={onChange} />
                </div>
        </div>
    );
};

export default memo(Compact);