import React, { useEffect, useMemo, useState } from 'react';
import AdCreatingOne from './AdCreatingOne/AdCreatingOne/AdCreatingOne';
import AdCreatingThree from './AdCreatingThree/AdCreatingThree';
import AdCreatingTwo from './ADCreatingTwo/AdCreatingTwo/AddCreatingTwo'

import { motion, transform } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { addMyAds, changeTaskInformation } from '../store/information';
import BackButton from '../constants/BackButton';
import MainButton from '../constants/MainButton';
import { useNavigate } from 'react-router-dom';

const variants = {
    initial : {opacity : 0},
    animate : {opacity : 1},
    transition : {duration : 0.4}
}

let spet = 0;
const AdCreating = () => {

    const [taskInformation , setTaskInformation]  =  useState (useSelector(state => state.information.taskInformation) )
    

    const tonConstant = useSelector(state => state.ton.value)
    
    const [stationNow , setStationNow] = useState(0)

    const navigate = useNavigate()
    
    const dispatch = useDispatch()



    function animte(){

        let localSpet = spet
        setStationNow ( (spet)*(-100) - 3)
        setTimeout( () => {
            if (localSpet === spet){
                setStationNow((spet) * (-100))
            }
        } , 310 )
    }

    function goForward(){

        if (spet !== 2){

            
                spet += 1
                if (spet == 2){
                    MainButton.setText('ЗАКОЛДИРОВАТЬ')
                }
                animte()
            
        }
        else{
            dispatch(changeTaskInformation (taskInformation) )
            navigate('/MyAds')
            alert('отправлено!')
            MainButton.hide()
        }
    }
    function goBack(){
        if (spet === 0){
            navigate(-1)
        }
        else{
            spet -= 1
            let localSpet = spet
                setStationNow(spet*(-100) + 3)
                setTimeout( () => {
                    if (localSpet === spet){
                        setStationNow(spet*(-100))
                    }
                } ,210 )

            if (stationNow === -100){

            }
        }
    }

    const GreyIntWidth = useMemo(   () => {
        console.log('привет')
        return (document.documentElement.clientWidth  - 36) / 2
    } , [] )
    const  GreyWidth = useMemo( () => {
        return  GreyIntWidth.toString() + 'px' 
       
    } , [] ) 

    
    if (stationNow === -200){
        MainButton.setText('ЗАКОЛДИРОВАТЬ')
    }
    else{
        MainButton.setText('ДАЛЕЕ')
    }
    useEffect( () => {
        MainButton.onClick ( goForward )
        BackButton.onClick( goBack )
        return () => {
            BackButton.offClick(goBack)
            MainButton.offClick(goForward)        
        }

    } )
    
    
    useEffect (  () => {
        MainButton.show()
        BackButton.show()
        return () => {
            MainButton.hide()
        }
    } , [] )

    return (
        <motion.div
         className="AdCreating__container"
         
        style={{transform : 'translateX(' + stationNow.toString() + '%)', transition : '0.3s'}}
        >
            <button style={{position : 'absolute'}} onClick={() => {goForward()}} >Выфвфывфы</button>
            <AdCreatingOne setTaskInformation = {setTaskInformation}  taskInformation = {taskInformation} />
            <AdCreatingTwo GreyIntWidth = {GreyIntWidth} GreyWidth={GreyWidth} setTaskInformation = {setTaskInformation} taskInformation = {taskInformation} tonConstant = {tonConstant} />
            <AdCreatingThree taskInformation = {taskInformation} />
        </motion.div>
    );
};

export default AdCreating;