
import React, { useEffect, useState } from 'react';

import Cap from '../../../components/UI/Cap/Cap';
import Budget from '../Budget/Budget'
import MyDatePicker from '../DatePicker/DatePicker';
import DatePicker from 'react-mobile-datepicker';


import cl from './SecondAddCreating.module.css'
import MainButton from '../../../constants/MainButton';


// eslint-disable-next-line
Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

const SecondAddCreating = ({taskInformation , setTaskInformation, tonConstant , GreyWidth , GreyIntWidth , errors}) => {



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
      }

      const [state, setState] = useState({
        time: new Date().addHours(1),
        isOpen: false,
        isPicked : false,
        singleOpen : null,
        startTime : null, 
        endTime : null,
        isSingleOpen : false, 
        isStartOpen : false,
        isEndOpen : false
      });
      function handleSelect(time){
        if (state.isStartOpen){

          setState({...state , time : time, isOpen : false, isStartOpen : false, startTime : time })
          setTaskInformation({...taskInformation , startTime :time })
        }
        if (state.isSingleOpen){
          setState({...state , time : time, isOpen : false, isSingleOpen : false, singleTime : time })
          setTaskInformation({...taskInformation , singleTime :time })
        }
        if (state.isEndOpen){
          setState({...state , time : time, isOpen : false, isEndOpen : false, endTime : time })
          setTaskInformation({...taskInformation , endTime :time })
        }
      }
      function handleCancel(){
        setState({...state , isOpen : false})
      }


    let dateObject = document.querySelectorAll('.datepicker-modal')[1]
    let datePickerObject = document.querySelectorAll('.datepicker')[1]
    
    if (dateObject && datePickerObject){
      dateObject.style.display = 'block'
      dateObject.style.zIndex = '-1'
      dateObject.style.backgroundColor = 'unset'
      dateObject.style.transition = '0.3s'
      datePickerObject.style.transition = '0.3s'
    }
    useEffect( () => {


      
    function appear(){

      dateObject.style.zIndex = '100'
      dateObject.style.backgroundColor = 'rgba(0, 0, 0, .6)'
      datePickerObject.style.transform = 'translateY(0%)'
      MainButton.hide()
      
    }
    function disappear(){


      MainButton.show()
      dateObject.style.backgroundColor = 'unset'
      dateObject.style.display = 'block'
      datePickerObject.style.transform = 'translateY(100%)'


      
      window.scrollTo({
        top : 0,
        behavior : 'auto'
      })

    }


      if(dateObject && datePickerObject){

        if (state.isOpen){
          appear()

        }
        else{
          disappear()

        }
      }
      
    } , [state.isOpen , dateObject , datePickerObject] )











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
             min = { new Date(new Date().addHours(1) + 1)    }
          />


            <Cap className={cl.Cap}  step={2} > <p className = {cl.CapText}> Создайте объявление </p> </Cap>
            <Budget errorTon = {errors.ton} taskInformation={taskInformation} setTaskInformation={setTaskInformation}  className={cl.Budget} tonConstant = {tonConstant} />
            <MyDatePicker 
            errors = {{singleError : errors.singleError , startError : errors.startError, endError : errors.endError }}
            state={state} setState = {setState} GreyWidth = {GreyWidth} GreyIntWidth={GreyIntWidth} taskInformation={taskInformation} setTaskInformation={setTaskInformation} className={cl.DatePicker} />
      </div>
    );
};

export default SecondAddCreating;