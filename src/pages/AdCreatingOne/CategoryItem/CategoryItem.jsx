import React, { useMemo } from 'react';
import cl from './CategoryItem.module.css'
import '../../../images/icons/Palitra.png'
import designIcon from "../../../images/icons/Palitra.png"
import ItIcon from "../../../images/icons/IT.svg"
const CategoryItem = ({className , id , category  }) => {
    const imageSrc = useMemo( () => {
        switch (id){
            case 1:
                return designIcon
            case 2: 
                return ItIcon
            default :
                
        }
    }  , [id])
    return (
        <div value = {id} className = {className ? [cl.CategoryItem , className].join(' ') : cl.CategoryItem }>
            <img src = {imageSrc}  alt="" />
            <p>{category}</p>
        </div>
    );
};

export default CategoryItem;