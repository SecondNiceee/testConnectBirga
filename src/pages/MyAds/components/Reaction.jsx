import React from 'react';
import tie from '../../../images/icons/Tie.svg'
import share from '../../../images/icons/Share.svg'
import star from '../../../images/icons/Star.svg'

import photo from '../../../images/nonUsed/photo_2024-03-02 03.14.svg'
import icon from '../../../images/icons/icon.svg'
import './../MyAds.css'
const Reaction = ({goForward}) => {
    return (
        <>
                
                <div className="reaction">
                    <div className="reactions__images">
                        <img src={photo} alt="" />
                        <img src={photo} alt="" />
                    </div>
                    <div className="reaction__middle">
                        <img className="icon" src={icon} alt="" />
                        <div className="reaction__middle-midle">
                            <p className="reaction__userName">Александр П.</p>
                            <div className="reaction__rates">
                                <img   src={star} alt="" />
                                <div className="rates__text">
                                  <p><span>4</span></p>
                                  <p>◦</p>
                                  <p>158 отзывов</p>
                                  <p>◦</p>
                                  <p>Стаж 8 лет</p>

                                </div>

                            </div>
                        </div>
                        <div className="circle">
                            <img className="shareImage" src={share} alt="" />
                        </div>
                    </div>
                    <div className="reactions__bottom">
                            <button onClick={() => {
                                goForward()
                            }} 
                             className="bottom__one">подробнее</button>
                            <button className="bottom__two">выбрать</button>
                            <img className="tie" src={tie} alt="" />
                    </div>
                </div>



        </>
    );
};

export default Reaction;