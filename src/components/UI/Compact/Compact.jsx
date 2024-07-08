import React, { memo } from 'react';
import cl from './Compact.module.css'
const Compact = ({ title, children, className}) => {
    return (
        <div className={className ? [cl.compactWrapper , className].join(' ') : cl.compactWrapper}>
            <h3 className={cl.compactTitle}>{title}</h3>
            
                {children}

        </div>
    );
};

export default memo(Compact);