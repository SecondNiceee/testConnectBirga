import React from 'react';
import icon from '../../../images/icons/icon.svg';
import LastTopCenter from './LastTopCenter';
import LastLeftArr from './LastLeftArr';
const LastTop = ({openAboutReactionFunc}) => {
    return (
        <div className="last-top">
            <img src={icon} alt="" className="icon" />
            <LastTopCenter />
            <LastLeftArr onClick = {() => {
                openAboutReactionFunc()
            }} />
        </div>
    );
};

export default LastTop;