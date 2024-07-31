import React, { memo, useCallback, useEffect, useRef } from 'react';
import TaskDetailsContainer from './TaskDetailsContainer';
import TimeAndWatches from './TimeAndWatches';
import SimilarAds from './SimilarAds';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addWatch } from '../../../store/information';

const FirstDetails = ({  orderInformation , className , setProfile, end = false, breakRef, ...props}) => {

    useEffect( () => {  
        if (breakRef.current && mainRef.current){

            breakRef.current.style.overflow = "hidden"
            mainRef.current.style.overflow = "scroll"
            document.documentElement.style.overflow = "hidden"
        }
    } , [] )
    
    // useEffect( () => {
    //     focuseHandelr()
    //     return () => {
    //         unfocusHandler()
    //     }
    // } , [focuseHandelr, unfocusHandler] )

    const mainRef = useRef()
    console.log('рендер детаилса')
    const disatch = useDispatch()
    useEffect( () => {
        if (!end){

            disatch(addWatch(orderInformation))
        }
    } , [] )

    // useEffect( () => {
    //     document.documentElement.style.overflowY = "unset"
    //     document.documentElement.style.marginTop = "0px"
    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth",
    //       });
    //     return () => {
    //         document.documentElement.style.marginTop = "40px"
    //         window.scrollTo({
    //             top: 40,
    //             behavior: "smooth",
    //           });
    //         document.documentElement.style.overflowY = "hidden"
    //     }
    // } , [])

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