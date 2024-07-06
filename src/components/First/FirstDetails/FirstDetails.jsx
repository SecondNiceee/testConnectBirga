import React from 'react';
import TaskDetailsContainer from './TaskDetailsContainer';
import TimeAndWatches from './TimeAndWatches';
import SimilarAds from './SimilarAds';

const FirstDetails = ({  orderInformation , similarAds , isDetailsActive, setDetailsActive , className}) => {





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