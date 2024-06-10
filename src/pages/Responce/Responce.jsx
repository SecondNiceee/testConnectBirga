import React from 'react';
import FirstBlock from '../../components/First/FirstMain/FirstBlock';

const Responce = ({taskInformation}) => {
    return (
        <div>
            <FirstBlock {...taskInformation} />

        </div>
    );
};

export default Responce;