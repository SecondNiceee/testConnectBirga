import React, { memo, useCallback, useEffect, useRef } from 'react';
import TaskDetailsContainer from './TaskDetailsContainer';
import TimeAndWatches from './TimeAndWatches';
import SimilarAds from './SimilarAds';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addWatch } from '../../../store/information';

const FirstDetails = ({  orderInformation , className , setProfile, end = false, breakRef, isDetailsActive, ...props}) => {

    useEffect( () => {  
        if (isDetailsActive ){
            if (breakRef.current && mainRef.current){

                breakRef.current.style.overflow = "hidden"
                mainRef.current.style.overflow = "scroll"
            }
        }
        else{
            if (breakRef && mainRef){

                breakRef.current.style.overflow = "scroll"
                mainRef.current.style.overflow = "hidden"
            }
        }

    } , [] )
    

    const mainRef = useRef()
    console.log('рендер детаилса')
    const disatch = useDispatch()
    useEffect( () => {
        if (!end){

            disatch(addWatch(orderInformation))
        }
    } , [] )


    return (
        <>
        {orderInformation 
            ? 
            (
            <div ref={mainRef} {...props} className  =  {className ? ['TaskDetails' , className].join(' ') : 'TaskDetails'} >

                <TaskDetailsContainer setProfile = {setProfile} end = {end}  orderInformation = {orderInformation} />
                
                {end ? <></> :<TimeAndWatches time={orderInformation.creationTime} watches={orderInformation.viewsNumber} />}
                
    
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