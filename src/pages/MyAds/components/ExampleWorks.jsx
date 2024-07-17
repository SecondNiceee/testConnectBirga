import React, { memo } from "react";
import Case from "../../../components/UI/Case/Case";

const ExampleWorks = ({cards , openFunc, setSliderActive}) => {
  return (
    <div className="examplesWork">
      {cards.length === 0 ? 
      <p className="exampleWork-text">Нет примеров работ</p>
      :
      <p className="exampleWork-text">Примеры работ</p>
      }
      
      <div className="cards__wraaper">
        {cards.map((e) => {
          return (
            <Case  card = {e} openFunc = {openFunc}  task = {e} setSliderActive={setSliderActive} title = {e.title} description={e.description} photos={e.photos} watchOnly={true} />
          )
        })}
      </div>
    </div>
  );
};

export default memo(ExampleWorks);
