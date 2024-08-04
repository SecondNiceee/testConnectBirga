import React from 'react';
import SmallDimond from '../../UI/SmallDimond/SmallDimond';

const FirstMainBottomLeft = ({tonValue, tonConstant}) => {
    return (
        <div className="FirstMain__bottom-left">
        <div className="FirstMain__price-up">
          <h3>{tonValue} TON</h3>
          <SmallDimond />
        </div>
        <p>
          ~{" "}
          {Number((tonValue * tonConstant).toFixed(0)).toLocaleString(
            "ru-RU"
          )}{" "}
          RUB
        </p>
      </div>
    );
};

export default FirstMainBottomLeft;