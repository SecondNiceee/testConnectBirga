import React, { useMemo } from "react";
import formatDate from "../../../functions/makeDate";
import Text from "../../Text/Text";
import translation from "../../../functions/translate";

const TimeAndWatches = ({ time, watches, responses }) => {

  const textOne = useMemo( () => {
    const w = Number(watches)
    if (0 < w < 5){
      return translation("просмотра")
    }
    else{

      if (w < 21){
        return translation("просмотров")
      }
      else{
        if (String(w).slice(String(w).length - 1, String(w).length) === "1"){
          return translation("просмотр")
        }
        else{
          if ( 1 < Number(String(w).slice(String(w).length - 1, String(w).length)) < 5  ){
            return "просмотра"
          }
          else{
            return "просмотров"
          }
        } 
      }
    }

  } , [watches] )
  const textTwo = useMemo( () => {
    const w = Number(responses)
    if (0 < w < 5){
      return translation("отклик")
    }
    else{

      if (w < 21){
        return translation("откликов")
      }
      else{
        if (String(w).slice(String(w).length - 1, String(w).length) === "1"){
          return translation("отклик")
        }
        else{
          if ( 1 < Number(String(w).slice(String(w).length - 1, String(w).length)) < 5  ){
            return "отклика"
          }
          else{
            return "откликов"
          }
        } 
      }
    }

  } , [responses] )
  return (
    <div className="timeAndWatches">
      <p className="watches"><span>{watches}</span> {textOne}   <span>{responses}</span> {textTwo}</p>
      <div className="createdAt-block">
        <Text>Создано </Text>
        <p>{formatDate(new Date(time))}</p>
        
      </div>
    </div>
  );
};

export default TimeAndWatches;
