import React from 'react';
import cl from "../index.module.scss"
import StageThree from './StageThree';
import StageOne from './StageOne';
import StageTwo from './StageTwo';
const Stages = ({address}) => {
    return (
        <div className={cl.stages}>

                <StageOne address={address} />

                <StageTwo />


                <StageThree />

        </div>
    );
};

export default Stages;