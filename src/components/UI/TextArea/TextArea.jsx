import React, { useCallback } from 'react';
import cl from './TextArea.module.css'
const TextArea = ({className , value , setValue , ...props}) => {
    const focuseHandelr = useCallback( () => {
        document.documentElement.style.overflowY = "unset"
        document.documentElement.style.marginTop = "0px"
    } , [] )
    const unfocusHandler = useCallback( () => {
        
        setTimeout( () => {

            document.documentElement.style.marginTop = "40px"
            window.scrollTo(0,40)
            document.documentElement.style.overflowY = "hidden"
        }, 350 )
    } , [] )
    return (
        <textarea onFocus={focuseHandelr} onBlur={unfocusHandler}  spellCheck="false"  autoComplete="off" value={value} onChange = {(e) => {setValue(e.target.value)}} className = {className ? [cl.TextArea , className].join(' ') : cl.TextArea} {...props}></textarea>
    );
};

export default TextArea;