import React, { useMemo } from 'react';
import cl from "./Stage.module.css"
import Text from '../../Text/Text';
const Stage = ({className, numberB}) => {
    const kk = useMemo(() => {
      if (!numberB || numberB === null){
        return "Не указан"
      }
      else{

        let number = String(numberB)
          let numb = Number(number.slice(number.length - 1 , number.length))
          if ( Number(number) > 10 && Number(number) < 20){
              return " Лет"
            }
            else{
        
                if (numb > 1 && numb < 5){
                  return " Года"
                }
                else{
                  if(numb === 1){
                    return " Год"
                  }
                  else{
                    return " Лет"
                  }
                }
              }
      }
    } , [numberB])
    return (
        <div className={ className ? [cl.main, className].join(' ') : cl.main}>
                <div style={!numberB ? {opacity : 0.5} : {}} className={cl.one}>
                    <Text>{!numberB ? "Не указан" : numberB}</Text>
                </div>
                {!numberB ? 
                <>
                </>
    :
                <div className={cl.two}>
                    <Text>{kk}</Text>
                </div>
                }
        </div>
    );
};

export default Stage;