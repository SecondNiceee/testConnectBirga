import React, { memo } from 'react';
import formatDate from '../../../functions/makeDate';

const FirstMainMiddle = ({time}) => {
    return (
        <div className="FirstMain__middle">
        <p> {"Дедлайн: " + formatDate(time.end)}</p>
      </div>
    );
};

export default memo(FirstMainMiddle);