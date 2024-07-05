import React, { useState } from 'react';
import cl from './FalseTie.module.css'
import FalseTieImg from './../../../images/icons/Tie.svg'
const FalseTie = ({className}) => {
    const [active, setActive] = useState(false)
    // const tieRef = useRef(null)
    return (
        <div  onClick={(e) => {
            if (!active){
                setActive(true)
            }
            else{
                setActive(false)
            }
        }} className = {className ? [cl.FalseTie , className].join(' ') : cl.FalseTie}>
            <svg className={active ? [cl.falseTie, cl.animationClass].join(' ') : cl.falseTie} width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.0978 1.80176C15.8171 1.80176 16.247 3.18964 16.247 3.88358V19.2571C16.247 20.2179 15.4204 19.8976 14.0978 19.2571L9.46867 17.1752C9.46867 17.1752 9.08075 17.0151 8.64205 17.0151C8.20335 17.0151 7.81542 17.1752 7.81542 17.1752L3.18633 19.2571C1.86373 19.8976 1.03711 20.2179 1.03711 19.2571V3.88358C1.03711 2.21812 2.46992 1.80176 3.18633 1.80176H14.0978Z" stroke="#2EA5FF" stroke-width="1.66667" />
</svg>
        </div>
    );
};

export default FalseTie;