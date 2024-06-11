import React, { useEffect } from 'react';
import FirstBlock from '../FirstMain/FirstBlock';
import TaskDetailsContainer from './TaskDetailsContainer';
import TimeAndWatches from './TimeAndWatches';
import SimilarAds from './SimilarAds';

const FirstDetails = ({  orderInformation , similarAds , isDetailsActive, setDetailsActive , className}) => {
    const BackButton = window.Telegram.WebApp.BackButton;





    return (
        <>
        {orderInformation 
            ? 
            (
            <div className  =  {className ? ['TaskDetails' , className].join(' ') : 'TaskDetails'} >
    
                <TaskDetailsContainer  orderInformation = {orderInformation} />
    
                <TimeAndWatches time={orderInformation.creationTime} watches={orderInformation.viewsNumber} />
    
                <SimilarAds similarAds = {[]} />
    
            </div>
            )
            :
            <>
            </>
        }
        </>
    );
};

export default FirstDetails;