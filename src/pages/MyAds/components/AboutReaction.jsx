import React from "react";



import AboutTop from "./AboutTop";
import AboutInfo from "./AboutInfo";
import AboutMain from "./AboutMain";
import ExampleWorks from "./ExampleWorks";
import Top from "./Top";

const AboutReaction = ({aboutReaction, ...props}) => {
  const aboutU = `хай как дела я ахахаха пустые строки тут оказываются тоже возможно , но это же просто предпочтение, верно??

  смешно прикол
  или неттт???
  `
  return (
    <div className="aboutReaction" {...props}>
      <button style={{
        width : '200px',
        height : '50px',
        position : 'fixed',     
        left : '25%',
        top : '0%'
      }}
      >НАЗАД</button>

      <Top name={'Отклики'}/>

      <AboutTop />

      <AboutInfo />

      <AboutMain aboutU = {aboutU} aboutReaction = {aboutReaction} />

      <ExampleWorks />

    </div>
  );
};
export default AboutReaction;
