import React, { useCallback } from 'react';
import cl from './TextArea.module.css'
const TextArea = ({className , value , setValue , ...props}) => {
    const focuseHandelr = useCallback( () => {
        document.documentElement.style.overflowY = "scroll"
    } , [] )
    const unfocusHandler = useCallback( () => {
        document.documentElement.style.overflowY = "hidden"
    } , [] )
    return (
        <textarea  spellCheck="false"  autoComplete="off" value={value} onChange = {(e) => {setValue(e.target.value)}} className = {className ? [cl.TextArea , className].join(' ') : cl.TextArea} {...props}></textarea>
    );
};

export default TextArea;