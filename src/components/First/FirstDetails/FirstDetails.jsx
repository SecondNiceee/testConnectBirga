import React, { memo, useEffect } from 'react';
import TaskDetailsContainer from './TaskDetailsContainer';
import TimeAndWatches from './TimeAndWatches';
import SimilarAds from './SimilarAds';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addWatch } from '../../../store/information';

const FirstDetails = ({  orderInformation , className , end = false, ...props}) => {


    console.log('рендер детаилса')
    const disatch = useDispatch()
    useEffect( () => {
        disatch(addWatch(orderInformation))
    } , [] )

    return (
        <>
        {orderInformation 
            ? 
            (
            <div {...props} className  =  {className ? ['TaskDetails' , className].join(' ') : 'TaskDetails'} >
    
                <TaskDetailsContainer end = {end}  orderInformation = {orderInformation} />
    
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

export default memo(FirstDetails);