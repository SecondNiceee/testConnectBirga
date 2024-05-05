import { useDispatch, useSelector } from 'react-redux';
import { changeTaskInformation } from '../../../store/information';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import Cap from '../../../components/UI/Cap/Cap';
import Budget from '../Budget/Budget'
import MyDatePicker from '../DatePicker/DatePicker';
import BackButton from '../../../constants/BackButton';
import DatePicker from 'react-mobile-datepicker';


import cl from './SecondAddCreating.module.css'


const SecondAddCreating = ({taskInformation , setTaskInformation, tonConstant , GreyWidth , GreyIntWidth}) => {



      const monthMap = {
        '1': 'Янв',
        '2': 'Фев',
        '3': 'Март',
        '4': 'Апр',
        '5': 'Май',
        '6': 'Июнь',
        '7': 'Июль',
        '8': 'Авг',
        '9': 'Сен',
        '10': 'Окт',
        '11': 'Ноя',
        '12': 'Дек',
    };
      const dateConfig = {

            'month': {
              format: value => monthMap[value.getMonth() + 1],
              caption: 'Мес',
              step: 1,
          },
          'date': {
              format: 'DD',
              caption: 'День',
              step: 1,
          },
          'hour': {
              format: 'hh',
              caption: 'Час',
              step: 1,
          },
          'minute': {
              format: 'mm',
              caption: 'Мин',
              step: 1,
          },
      }

      const [state, setState] = useState({
        time: new Date(),
        isOpen: false,
        isPicked : false,
        singleOpen : null,
        startTime : null, 
        endTime : null,
        isSingleOpen : false, 
        isStartOpen : false,
        isEndOpen : false
      });
      function handleClick(){
        setState({...state, isOpen : true})
      }
      function handleSelect(time){
        if (state.isStartOpen){

          setState({...state , time : time, isOpen : false, isStartOpen : false, startTime : time })
        }
        if (state.isSingleOpen){
          
          setState({...state , time : time, isOpen : false, isSingleOpen : false, singleTime : time })
        }
        if (state.isEndOpen){
          setState({...state , time : time, isOpen : false, isEndOpen : false, endTime : time })
        }
      }
      function handleCancel(){
        setState({...state , isOpen : false})
      }


    let dateObject = document.querySelector('.datepicker-modal')
    let datePickerObject = document.querySelector('.datepicker')
    if (dateObject && datePickerObject){
      dateObject.style.display = 'block'
      dateObject.style.zIndex = '-1'
      dateObject.style.backgroundColor = 'unset'
      dateObject.style.transition = '0.3s'
      datePickerObject.style.transition = '0.3s'
    }
    useEffect( () => {
      if(dateObject && datePickerObject){

        if (state.isOpen){
          appear()
          document.documentElement.style.overflow = 'hidden'
        }
        else{
          disappear()
          document.documentElement.style.overflow = 'visible'
        }
      }
      
    } , [state.isOpen] )


    useEffect( () => {
      let startY;
      let endY;
      let startX;
      let endX;
      function handleStart(e){
        startY = e.touches[0].pageY
        startX = e.touches[0].pageX
      }
      function handleMove(e){
        endY = e.touches[0].pageY
        endX = e.touches[0].pageX
      }
      function handleEnd(e){
        if (endY > startY) {
          setState({...state,isOpen : false})
        }
      }
      document.addEventListener('touchstart' , handleStart)
      document.addEventListener('touchmove' , handleMove)
      document.addEventListener('touchend' , handleEnd )
      return () => {
        document.removeEventListener('touchstart' , handleStart)
        document.removeEventListener('touchmove' , handleMove)
        document.removeEventListener('touchend' , handleEnd)
      }
  } , [])

    function appear(){
      dateObject.style.zIndex = '999'
      dateObject.style.bottom = '-80px'
      dateObject.style.backgroundColor = 'rgba(0, 0, 0, .6)'
      datePickerObject.style.transform = 'translateY(0%)'
      document.documentElement.style.marginTop = '80px'
      window.scrollTo({
        top : 80,
        behavior : 'auto'
      })
    }
    function disappear(){
      dateObject.style.bottom = '0px'
      dateObject.style.display = 'block'
      dateObject.style.zIndex = '-1'
      dateObject.style.backgroundColor = 'unset'
      datePickerObject.style.transform = 'translateY(100%)'

      document.documentElement.style.marginTop = '0px'
      window.scrollTo({
        top : '0px',
        behavior : 'auto'
      })


    }



    // dateObject.style = 'block'
    return (
      <div className = {cl.SecondAddCreating} 
      style={{minWidth : document.documentElement.clientWidth.toString() + 'px' }}
      >

    <DatePicker
          confirmText = 'Сохранить'
          cancelText = 'Отмена'
          theme = 'ios'
            showCaption = {true}
            dateConfig = {dateConfig}
            value={state.time}
            isOpen={true}
            onSelect={handleSelect}
            onCancel={handleCancel}
            min = {new Date()}
          />


            <Cap className={cl.Cap}  step={2} > <p className = {cl.CapText}> Создайте объявление </p> </Cap>
            <Budget taskInformation={taskInformation} setTaskInformation={setTaskInformation}  className={cl.Budget} tonConstant = {tonConstant} />
            <MyDatePicker 
            
            state={state} setState = {setState} GreyWidth = {GreyWidth} GreyIntWidth={GreyIntWidth} taskInformation={taskInformation} setTaskInformation={setTaskInformation} className={cl.DatePicker} />
      </div>
    );
};

export default SecondAddCreating;