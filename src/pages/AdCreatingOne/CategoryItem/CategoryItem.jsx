import React from 'react';
import cl from './CategoryItem.module.css'
import '../../../images/icons/Palitra.png'
const CategoryItem = ({className , id , category  }) => {
    return (
        <div value = {id} className = {className ? [cl.CategoryItem , className].join(' ') : cl.CategoryItem }>
            {/* <img src = { require('../../../images/icons/' + icon)}  alt="" /> */}
            <p>{category}</p>
        </div>
    );
};

export default CategoryItem;