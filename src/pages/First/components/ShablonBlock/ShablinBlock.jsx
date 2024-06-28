import React from 'react';
import cl from './ShablonBlock.module.css'
import Component from '../../../../components/UI/Component/Component';
import AdCreateFunc from '../../../../components/UI/AdCreateFunc/AdCreateFunc';
import Choicer from '../../../../components/UI/Choicer/Choicer';
const ShablinBlock = ({shablonsArr, isActive , setActive, className}) => {

    return (
        <div className={className ? [cl.main,className].join(' ') : cl.main}>
            {shablonsArr.length > 0 ?
            <Component className={cl.component}>
                    <p>Шаблон</p>
                    <Choicer isActive={isActive} setActive={setActive} text={"привет"} arr={shablonsArr} />
            </Component>
            :
            <AdCreateFunc text={"Создать шаблон"} link={"/Shablon"}  />
            }
        </div>
    );
};

export default ShablinBlock;