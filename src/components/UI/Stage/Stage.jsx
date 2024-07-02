import React, { useMemo } from 'react';
import cl from "./Stage.module.css"
const Stage = ({className,number}) => {
    const kk = useMemo(() => {
        
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
    } , [])
    return (
        <div className={ className ? [cl.main, className].join(' ') : cl.main}>
                <div className={cl.one}>
                    <p>{number}</p>
                </div>
                <div className={cl.two}>
                    <p>{kk}</p>
                </div>
        </div>
    );
};

export default Stage;