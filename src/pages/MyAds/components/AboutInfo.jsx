import React, { useCallback, useMemo } from "react";
import Text from "../../../components/Text/Text";

const AboutInfo = ({responce}) => {
  const counter = useCallback((par) => {
    if (Number(par) === 1){
      return "Задание"
    } 
    else{
      if (Number(par) > 1 && Number(par) < 5){
        return "Задания"
      }
      else{
        return "Заданий"
      }
    }
// eslint-disable-next-line
  }, [])

  


  return (
    <div className="aboutInfo">
      <div className="name">
        <Text>{responce.user.fl}</Text>
      </div>

      <div onClick={() => {
        window.Telegram.WebApp.openTelegramLink("https://t.me/" + responce.user.link)
      }} className="userLink">
        <Text className="telegramLink"> Открыть в Telegram </Text>

        
      </div>
      <div className="aboutDown">
        <div className="block">
          <Text>{responce.createNumber}</Text>
          <Text className="aboutInfo__text">{counter(responce.createNumber)} создано</Text>
          
        </div>
        <div className="block">
          <Text>{responce.user.completedAdvertisements.length}</Text>
          <Text className="aboutInfo__text">{counter(responce.user.completedAdvertisements.length)} выполнено</Text>
        </div>
      </div>

    </div>
  );
};

export default AboutInfo;
