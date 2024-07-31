import React, { memo, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import TaskDetailsContainer from '../../components/First/FirstDetails/TaskDetailsContainer';
import TimeAndWatches from '../../components/First/FirstDetails/TimeAndWatches';
import SimilarAds from '../../components/First/FirstDetails/SimilarAds';
import { transform } from 'framer-motion';

const FirstDetails = ({   className , setProfile, end = false, ...props}) => {



    const orderInformation = {
        id: 1,
        taskName: "Пробное задание",
        executionPlace: "Можно выполнить удаленно",
        time: { start: new Date(), end: new Date() },
        tonValue: 222,
        taskDescription: "",
        photos: [],
        photosName: [],
        customerName: "Коля",
        userPhoto: "",
        rate: "5",
        isActive: true,
        creationTime: new Date(),
        viewsNumber: 0,
        responces: [],
        status: "active",
        user: {},
        createNumber : 1
    
    }


    let startParam = window.Telegram.WebApp.initDataUnsafe.start_param


    alert(startParam)
    
    const focuseHandelr = useCallback( () => {
        document.documentElement.style.overflowY = "auto"
        document.documentElement.style.marginTop = "0px"
    } , [] )
    const unfocusHandler = useCallback( () => {
        
            document.documentElement.style.marginTop = "20px"
            window.scrollTo(0,40)
            document.documentElement.style.overflowY = "hidden"
    } , [] )
    
    useEffect( () => {
        focuseHandelr()
        return () => {
            unfocusHandler()
        }
    } , [focuseHandelr, unfocusHandler] )

    console.log('рендер детаилса')


    // const disatch = useDispatch()
    // useEffect( () => {
    //     if (!end){

    //         disatch(addWatch(orderInformation))
    //     }
    // } , [] )

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
            <div style={{transform : "translateX(0%)"}} {...props} className  =  {className ? ['TaskDetails' , className].join(' ') : 'TaskDetails'} >
    
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