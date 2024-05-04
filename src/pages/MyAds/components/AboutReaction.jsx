import React from "react";



import AboutTop from "./AboutTop";
import AboutInfo from "./AboutInfo";
import AboutMain from "./AboutMain";
import ExampleWorks from "./ExampleWorks";
import Top from "./Top";

const AboutReaction = () => {
  const aboutU = `хай как дела я ахахаха пустые строки тут оказываются тоже возможно , но это же просто предпочтение, верно??

  смешно прикол
  или неттт???
  `
  const aboutReaction = `Доброго времени суток!
Работа выполняется до полного согласования, пока результат Вас полностью не устроит.
Фиксированная стоимость, независимо от количества предложенных вариантов.
Гарантирую достойный результат!
  
Опыт работы 8 лет в сфере типографического дизайна, без трудностей поможет мне выполнить Ваш заказ любой сложности с: растровыми изображениями и векторной графикой, разработкой макетов полиграфической продукции (визитки, листовки, буклеты, евробуклеты и т.д.), рекламной продукции (ручки, пакеты, футболки и т.д.), наружной рекламы, разработкой логотипов и фирменого стиля`

  return (
    <div className="aboutReaction">

      <Top name={'Отклики'}/>

      <AboutTop />

      <AboutInfo />

      <AboutMain aboutU = {aboutU} aboutReaction = {aboutReaction} />

      <ExampleWorks />

    </div>
  );
};
export default AboutReaction;
