import React from "react";
import Case from "../../../components/UI/Case/Case";

const ExampleWorks = ({cards , setSliderActive}) => {
  return (
    <div className="examplesWork">
      <p className="exampleWork-text">Примеры работ</p>
      <div className="cards__wraaper">
        {cards.map((e) => {
          return (
            <Case setSliderActive={setSliderActive} title = {e.title} description={e.description} photos={e.photos} />
          )
        })}
      </div>
    </div>
  );
};

export default ExampleWorks;
