import React, { memo, useEffect, useMemo, useRef } from 'react';
import cl from "../index.module.scss"
import GreyText from '../../../components/UI/GreyText/GreyText';
import CreateInput from '../../../components/UI/CreateInput/CreateInput';
const CompactWithWidth = ({greyText, onChange, inputType = "text", inputMode = "text", inputValue, inputPlaceholder, className = ""}) => {
    const hiddenRef = useRef(null)
    const inputRef = useRef(null)
    useEffect( () => {
        hiddenRef.current.textContent = inputValue !== "0" ? inputValue : "0"
        inputRef.current.style.width = inputValue !== "0" ?  hiddenRef.current.offsetWidth + "px" : "26px"
    } , [inputValue] )
    return (
        <div className={[className, cl.adressBlock].join(' ')}>
                <p ref={hiddenRef} className={cl.hiddenText}>{inputValue}</p>
                <GreyText className={cl.GreyText} >
                    {greyText}
                </GreyText>

                <div className={cl.createWrapper}>
                    <CreateInput className = {cl.newPadding} ref = {inputRef}  inputMode={inputMode} type={inputType} value={inputValue}  placeholder = {inputPlaceholder} setValue={onChange} />
                    <p>TON</p>
                </div>
        </div>
    );
};

export default memo(CompactWithWidth);