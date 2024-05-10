import React from 'react';
import subtruct from '../../../images/icons/Subtract.svg';
import star from '../../../images/icons/Star.svg';
const LastTopCenter = () => {
    return (
    <div className="last-top-center">

        <div className="top-name-bl">
          <p>Александр П.</p>
          <img src={subtruct} className="last-subtruct" alt="" />
        </div>
        
        <div className="top-characters">
          <img src={star} className="last-star" alt="" />
          <div className="characters-bl">
            <p>4 ◦ 158 отзывов ◦ Стаж 8 лет</p>
          </div>
        </div>

    </div>
    );
};

export default LastTopCenter;