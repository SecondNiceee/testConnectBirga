import React, { memo } from 'react';
import formatDate from '../../../functions/makeDate';

const FirstMainMiddle = ({time}) => {
    return (
        <div className="FirstMain__middle">
        <p> {"Начать: " + formatDate(time.start)}</p>
      </div>
    );
};

export default memo(FirstMainMiddle);