import React from 'react';
import cl from './TaskName.module.css'
import GreyText from '../../../components/UI/GreyText/GreyText';
import CreateInput from '../../../components/UI/CreateInput/CreateInput';
const TaskName = ({className , taskInformation , setTaskInformation , errorName , ...props}) => {
    return (
        <div {...props} className = { className ? [className , cl.TaskName].join(' ') : cl.TaskName}>
            <GreyText className={cl.GreyText} > Название задания </GreyText>
            <CreateInput style = {errorName 
                ? {border : 'solid 1px red'}
                : {}
            } value={taskInformation.taskName} setValue={ (e) => {setTaskInformation({...taskInformation , taskName : e})} } className={cl.CreateInput} placeholder = "Что нужно сделать?" />
            <p style={errorName ? {color : 'red'} : {}}>
                {errorName ? 'Название слишком маленькое' :  'Например, разработать дизайн для сайта'}
            </p>
        </div>
    );
};

export default TaskName;