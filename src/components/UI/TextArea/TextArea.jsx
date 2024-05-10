import React from 'react';
import cl from './TextArea.module.css'
const TextArea = ({className , value , setValue , ...props}) => {
    return (
        <textarea spellCheck="false"  autoComplete="off" value={value} onChange = {(e) => {setValue(e.target.value)}} className = {className ? [cl.TextArea , className].join(' ') : cl.TextArea} {...props}></textarea>
    );
};

export default TextArea;