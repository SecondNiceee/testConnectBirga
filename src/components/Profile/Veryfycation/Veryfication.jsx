import React from 'react';
import Subtract from '../../../images/icons/SubtractWhite.svg'
import greyArrowRight from '../../../images/icons/greyArrowRight.svg'
const Veryfication = () => {
    return (
        <div className="profile__veryfication">
        <p className="veryfication">Верификация</p>
        <div className="veryfication__block">
          <div className="Okey">
            <img className="Subtract" src={Subtract} alt="" />
          </div>

          <div className="veryfication__block-text">
            <p>Пройти KYC верификацию</p>
            <p>
              Подтвердите свою личность <br />и получайте на 20% больше откликов
            </p>
          </div>
          <img src={greyArrowRight} className="greyArrow" alt="" />
        </div>
      </div>

    );
};

export default Veryfication;