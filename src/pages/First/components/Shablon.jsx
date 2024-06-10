import React from 'react';
import Switcher from '../../../components/UI/Switcher/Switcher'

const Shablon = ({  shablon , setShablon  , ...props }) => {
    return (
        <div {...props}>
            <div className="shablon-wrapper">
                <p>Использовать шаблон</p>
                <Switcher isEnable={shablon} setEnable={() => {
                    setShablon(!shablon)
                }}  />
            </div>
            
        </div>
    );
};

export default Shablon;