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
            isOpen={state.isOpen}
            onSelect={handleSelect}
            onCancel={handleCancel}
          />


            <Cap className={cl.Cap}  step={2} > <p className = {cl.CapText}> Создайте объявление </p> </Cap>
            <Budget taskInformation={taskInformation} setTaskInformation={setTaskInformation}  className={cl.Budget} tonConstant = {tonConstant} />
            <MyDatePicker 
            
            state={state} setState = {setState} GreyWidth = {GreyWidth} GreyIntWidth={GreyIntWidth} taskInformation={taskInformation} setTaskInformation={setTaskInformation} className={cl.DatePicker} />
      </div>
    );
};

export default SecondAddCreating;