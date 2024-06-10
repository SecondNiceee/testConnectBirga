import React, { useEffect, useState } from 'react';
import FirstBlock from '../../components/First/FirstMain/FirstBlock';
import Shablon from './components/Shablon';

const Responce = ({orderInformation}) => {
    const [shablon , setShablon] = useState(false)

    return (
        <div className='responce-wrapper'>
            <FirstBlock {...orderInformation} />
            <Shablon shablon={shablon} setShablon={setShablon} />
        </div>
    );
};

export default Responce;