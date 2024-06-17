import React from 'react';
import cl from './TaskName.module.css'
import GreyText from '../GreyText/GreyText';
import CreateInput from '../CreateInput/CreateInput';
const TaskName = ({className , text , title , setText , errorValue , underText,  ...props}) => {
    return (
        <div {...props} className = { className ? [ cl.TaskName, className].join(' ') : cl.TaskName}>
            <GreyText className={cl.GreyText} > {title} </GreyText>
            <CreateInput style = {errorValue
                ? {border : 'solid 1px red'}
                : {}
            } value={text} setValue={ setText } className={cl.CreateInput} placeholder = "Что нужно сделать?" />
            <p style={errorValue ? {color : 'red',
                fontFamily : "SF Pro Display 400"
            } : {}}>
                {errorValue ?  'Название слишком маленькое' :  underText}
            </p>
        </div>
    );
};

export default TaskName;