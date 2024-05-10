import React from 'react';
import greenSubtruct from '../../../images/icons/greenSubtruct.svg';
import subtruct from '../../../images/icons/Subtract.svg';
const LastSertificates = () => {
    return (
        <div className="last-sertificates">

          <div className="documents-agree">
            <img src={subtruct} alt="" />
            <p>Документы подтвержены</p>
          </div>

          <div className="user-agree">
            <img src={greenSubtruct} alt="" />
            <p>Проверенный пользователь</p>
          </div>

        </div>
    );
};

export default LastSertificates;