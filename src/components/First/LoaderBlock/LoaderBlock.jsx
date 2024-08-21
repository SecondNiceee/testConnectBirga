import React from 'react';
import cl from "./LoaderBlock.module.css"
import MyLoader from '../../UI/MyLoader/MyLoader';
const LoaderBlock = () => {
    return (
        <div className={cl.wrapper}>
            <MyLoader style = {{width : "100vw" , height : "100vh" } }  />
        </div>
    );
};

export default LoaderBlock;