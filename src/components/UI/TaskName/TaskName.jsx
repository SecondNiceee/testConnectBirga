import React, { useMemo } from 'react';
import cl from './TaskName.module.css'
import GreyText from '../GreyText/GreyText';
import CreateInput from '../CreateInput/CreateInput';
import Text from '../../Text/Text';
import translation from '../../../functions/translate';
const TaskName = ({className , text , title , setText , errorValue , underText, placeholder,  ...props}) => {
    const place = useMemo( () => {
        return translation(placeholder)
    }  , [placeholder])
    return (
        <div {...props} className = { className ? [ cl.TaskName, className].join(' ') : cl.TaskName}>
            <GreyText className={cl.GreyText} > {title} </GreyText>
            <CreateInput style = {errorValue
                ? {border : 'solid 1px #FF6767'}
                : {}
            } value={text} setValue={ setText } className={cl.CreateInput} placeholder = {place} />
            <Text style={errorValue ? {color : '#FF6767',
                fontFamily : "SF Pro Display 400"
            } : {}}>
                {errorValue ?  'Название слишком короткое' :  underText}
            </Text>
        </div>
    );
};

export default TaskName;