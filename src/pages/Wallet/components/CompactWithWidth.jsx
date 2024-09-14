import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import cl from "../index.module.scss"
import GreyText from '../../../components/UI/GreyText/GreyText';
import CreateInput from '../../../components/UI/CreateInput/CreateInput';
const CompactWithWidth = ({greyText, onChange,inputMistake = false, inputType = "text", inputMode = "text", inputValue, inputPlaceholder, className = ""}) => {
    const hiddenRef = useRef(null)
    const inputRef = useRef(null)
    useEffect( () => {
        hiddenRef.current.textContent = inputValue !== "0" ? inputValue : "0"
        inputRef.current.style.width = inputValue !== "0" ?  hiddenRef.current.offsetWidth + "px" : "26px"
    } , [inputValue] )
    const clickHndler = useCallback( () => {
        inputRef.current.focus()
    } , [] )
    return (
        <div className={[className, cl.adressBlock].join(' ')}>
                <p ref={hiddenRef} className={cl.hiddenText}>{inputValue}</p>
                <GreyText className={cl.GreyText} >
                    {greyText}
                </GreyText>           

                <div onClick={clickHndler}  style={inputMistake ? {border : "1px solid #fe6766"} : {}} className={cl.createWrapper}>
                    <CreateInput mistake = {inputMistake}  className = {cl.newPadding} ref = {inputRef}  inputMode={inputMode} type={inputType} value={inputValue}  placeholder = {inputPlaceholder} setValue={onChange} />
                    <p style={inputMistake ? {color : "#fe6766"} : {}}>TON</p>
                </div>
        </div>
    );
};

export default memo(CompactWithWidth);