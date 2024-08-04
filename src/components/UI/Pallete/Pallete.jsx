import React, { useMemo } from 'react';
import cl from './Pallete.module.css'
import PalleteImg from '../../../images/icons/Palitra.png'
import ItSvg from "../../../images/icons/IT.svg"
const Pallete = ({className , category}) => {
    console.log(category)
    const imageSrc = useMemo( () => {
        switch (category){
            case 1 : 
                return PalleteImg
            case 2:
                return ItSvg
            default :

        }
    } , [category]  )
    return (
        <div className = {className ? [cl.Pallete , className].join(' ') : cl.Pallete}>
            <img src = {imageSrc} alt="" />
        </div>
    );
};

export default Pallete;