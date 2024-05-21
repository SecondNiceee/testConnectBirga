import React, { useEffect } from 'react';
import FirstBlock from '../FirstMain/FirstBlock';
import TaskDetailsContainer from './TaskDetailsContainer';
import TimeAndWatches from './TimeAndWatches';
import SimilarAds from './SimilarAds';

const FirstDetails = ({  orderInformation , similarAds , isDetailsActive, setDetailsActive}) => {
    const BackButton = window.Telegram.WebApp.BackButton;

    var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour : 'numeric',
        minute : 'numeric',
        timezone: 'UTC'
      };
      
    function closeDetails(){
        setDetailsActive(false)
    }

    useEffect( ()=> {
        BackButton.show()
        BackButton.onClick( closeDetails )
        return () => {
            BackButton.offClick(closeDetails)
            BackButton.hide()
        }
    } )

    return (

        <div className  =  'TaskDetails' >

            <TaskDetailsContainer  orderInformation = {orderInformation} />

            <TimeAndWatches time={orderInformation.creationTime} watches={orderInformation.viewsNumber} />

            <SimilarAds similarAds = {[]} />

        </div>
    );
};

export default FirstDetails;